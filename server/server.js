const express = require("express");
const cors = require("cors");
const { passwordStrength } = require('check-password-strength');
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { BlobServiceClient } = require("@azure/storage-blob");

const db = require("./db/dbConfig.js");
const authRoutes = require("./routes/authRoutes.js");
const eventRoutes = require("./routes/eventRoutes.js");

const app = express();

const SECRET_KEY = process.env.SECRET_KEY;
const saltRounds = 10;

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

// JWT Decoding Middleware
function decodeToken(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
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

app.get('/api/events/:eventId', async (req, res) => {
    try {
        const [events] = await db.query('SELECT * FROM events WHERE idevent = ?', [req.params.eventId]);
        
        if (events.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        
        res.json(events[0]);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });  
    }
});

// Updated route to fetch user events using JWT
app.get('/api/user/events', decodeToken, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from decoded token
        const [events] = await db.query('SELECT * FROM events WHERE user_iduser = ?', [userId]);
        res.json(events);
    } catch (error) {
        console.error('Error fetching user events:', error);
        res.status(500).json({ message: 'Error fetching user events' });
    }
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
