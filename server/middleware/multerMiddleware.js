const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require('fs').promises;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/createEventImages';
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = uuidv4()
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG and GIF files are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

const handleEventUpload = async (req, res, next) => {
    try {
        upload.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({
                    error: true,
                    message: `Upload error: ${err.message}`
                });
            } else if (err) {
                return res.status(500).json({
                    error: true,
                    message: `Server error: ${err.message}`
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    error: true,
                    message: 'No file uploaded'
                });
            }

            try {
                const containerName = "youthmeet-images";
                const blobName = `${Date.now()}-${req.file.originalname}`;
                const fileBuffer = await fs.readFile(req.file.path);

                const blobUrl = await uploadBlob(containerName, blobName, fileBuffer);
                req.body.imagePath = blobUrl;

                await fs.unlink(req.file.path);

                next();
            } catch (error) {
                return res.status(500).json({
                    error: true,
                    message: `Azure upload error: ${error.message}`
                });
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: `Unexpected error: ${error.message}`
        });
    }
};

async function uploadBlob(containerName, blobName, fileBuffer) {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(fileBuffer, fileBuffer.length);
    return blockBlobClient.url;
}

module.exports = { handleEventUpload };
