const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const multer = require('multer');
const { BlobServiceClient } = require("@azure/storage-blob");
const userRoutes = require("./routes/userRoutes.js");
const socketIo = require('socket.io'); 

const authRoutes = require("./routes/authRoutes.js");
const eventRoutes = require("./routes/eventRoutes.js");

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST, DELETE",
    credentials: true
};

const server = require('http').createServer(app);
const io = socketIo(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('joinEvent', (eventId) => {
      socket.join(`event_${eventId}`);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
});
  

app.set('io', io); 

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/userEvents', userRoutes);


const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

const upload = multer({ storage: multer.memoryStorage() });

async function uploadBlob(containerName, blobName, fileBuffer) {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(fileBuffer, fileBuffer.length);
    return blockBlobClient.url;
}

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

