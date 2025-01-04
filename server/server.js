const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const multer = require('multer');
const { BlobServiceClient } = require("@azure/storage-blob");

const db = require("./db/dbConfig.js");
const authRoutes = require("./routes/authRoutes.js");
const eventRoutes = require("./routes/eventRoutes.js");
const jwtVerify = require('./middleware/jwtVerify.js'); 

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST, DELETE",
    credentials: true
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', authRoutes);
app.use('/api/event', eventRoutes);

// Azure Blob Storage setup
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

// Multer setup for file upload
const upload = multer({ storage: multer.memoryStorage() });

// Azure Blob Storage upload function
async function uploadBlob(containerName, blobName, fileBuffer) {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(fileBuffer, fileBuffer.length);
    return blockBlobClient.url;
}

// File upload route
app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        const containerName = "youthmeet-images";
        const blobName = `${Date.now()}-${req.file.originalname}`;
        const fileBuffer = req.file.buffer;

        const blobUrl = await uploadBlob(containerName, blobName, fileBuffer);
        console.log("blobURL")
        res.status(200).json({ message: "File uploaded successfully", url: blobUrl });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "Error uploading file" });
    }
});

app.get("/", (req, res) => {
    res.send("Si Hei");
});

app.get('/api/events', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM events');
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching events');
    }
});

app.delete('/api/events/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const [result] = await db.query('DELETE FROM events WHERE idevent = ?', [eventId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Error deleting event' });
    }
});

app.get('/api/events/:eventId', jwtVerify, async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.user.id; // Get user ID from the JWT token

        // Fetch event details
        const [events] = await db.query('SELECT * FROM events WHERE idevent = ?', [eventId]);
        
        if (events.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const event = events[0];

        // Check if the user has joined this event
        const [attendees] = await db.query(
            'SELECT * FROM attendees WHERE events_idevent = ? AND user_iduser = ?',
            [eventId, userId]
        );

        // Add hasJoined property to the event object
        event.hasJoined = attendees.length > 0;

        res.json(event);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });  
    }
});


// Updated route to fetch user events using jwtVerify middleware
app.get('/api/user/events', jwtVerify, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from decoded token
        const [events] = await db.query('SELECT * FROM events WHERE user_iduser = ?', [userId]);
        res.json(events);
    } catch (error) {
        console.error('Error fetching user events:', error);
        res.status(500).json({ message: 'Error fetching user events' });
    }
});

app.get('/api/user/status', jwtVerify, (req, res) => {
    // If the token is valid and user is authenticated
    res.status(200).json({
      authenticated: true,
      username: req.user.username,
      email: req.user.email,
      iduser: req.user.id
    });
  });


  app.post('/api/logout', jwtVerify, (req, res) => {
    // Clear the authToken cookie by setting it to an empty value and expiring it
    res.cookie('authToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), // This sets the cookie to expire immediately
      sameSite: 'strict'
    });
  
    res.status(200).json({ message: 'Logged out successfully' });
  });
  

  app.post('/api/joinEvent', jwtVerify, async (req, res) => {
    try {
      const eventId = req.body.eventId;
      const userId = req.user.id;
  
      console.log('Event ID:', eventId);
      console.log('User ID:', userId);
  
      if (!eventId) {
        return res.status(400).json({ message: 'Invalid event ID' });
      }
  
      // Start transaction
      await db.query('START TRANSACTION');
  
      // Check if the event exists
      const [event] = await db.query('SELECT * FROM events WHERE idevent = ?', [eventId]);
      if (event.length === 0) {
        await db.query('ROLLBACK');
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Check if the user has already joined this specific event
      const [existingAttendee] = await db.query(
        'SELECT * FROM attendees WHERE events_idevent = ? AND user_iduser = ?',
        [eventId, userId]
      );
  
      if (existingAttendee.length > 0) {
        await db.query('ROLLBACK');
        return res.status(400).json({ message: 'You have already joined this event' });
      }
  
      // Add the user to the attendees table for this event
      await db.query(
        'INSERT INTO attendees (events_idevent, user_iduser) VALUES (?, ?)',
        [eventId, userId]
      );
  
      // Increment the InterestedCount in the events table
      await db.query(
        'UPDATE events SET InterestedCount = InterestedCount + 1 WHERE idevent = ?',
        [eventId]
      );
  
      // Commit the transaction
      await db.query('COMMIT');
  
      res.status(200).json({ message: 'Successfully joined the event' });
    } catch (error) {
      await db.query('ROLLBACK');
      console.error('Error joining event:', error);
      res.status(500).json({ message: 'Error joining event', error: error.message });
    }
  });


  app.post('/api/leaveEvent', jwtVerify, async (req, res) => {
    try {
      const eventId = req.body.eventId;
      const userId = req.user.id;
  
      console.log('Event ID:', eventId);
      console.log('User ID:', userId);
  
      if (!eventId) {
        return res.status(400).json({ message: 'Invalid event ID' });
      }
  
      // Start transaction
      await db.query('START TRANSACTION');
  
      // Check if the user has joined this event
      const [attendee] = await db.query(
        'SELECT * FROM attendees WHERE events_idevent = ? AND user_iduser = ?',
        [eventId, userId]
      );
  
      if (attendee.length === 0) {
        await db.query('ROLLBACK');
        return res.status(400).json({ message: 'You have not joined this event' });
      }
  
      // Remove the user from the attendees table
      await db.query(
        'DELETE FROM attendees WHERE events_idevent = ? AND user_iduser = ?',
        [eventId, userId]
      );
  
      // Decrement the InterestedCount in the events table
      await db.query(
        'UPDATE events SET InterestedCount = GREATEST(InterestedCount - 1, 0) WHERE idevent = ?',
        [eventId]
      );
  
      // Commit the transaction
      await db.query('COMMIT');
  
      res.status(200).json({ message: 'Successfully left the event' });
    } catch (error) {
      await db.query('ROLLBACK');
      console.error('Error leaving event:', error);
      res.status(500).json({ message: 'Error leaving event', error: error.message });
    }
  });
  
  
  
    
  
  // Optional: Route to check if user has joined an event
  app.get('/api/eventStatus', jwtVerify, async (req, res) => {
    try {
      const eventId = req.query.eventId; // Get eventId from query parameters
      const userId = req.user.id;
        
      if (!eventId) {
        return res.status(400).json({ message: 'Invalid event ID' });
      }
  
      const [existingAttendee] = await db.query(
        'SELECT * FROM attendees WHERE events_idevent = ? AND user_iduser = ?',
        [eventId, userId]
      );
  
      res.json({ 
        hasJoined: existingAttendee.length > 0 
      });
    } catch (error) {
      console.error('Error checking event join status:', error);
      res.status(500).json({ message: 'Error checking join status', error: error.message });
    }
  });

  
  


app.listen(4000, () => {
    console.log("Server running on port 4000");
});
