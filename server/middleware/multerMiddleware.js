const multer = require('multer');
const path = require('path');
const { uuid } = require('uuidv4');

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/eventImages';
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = uuid()
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
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

const handleEventUpload = async (req, res, next) => {
    const uploadSingle = upload.single('image');

    uploadSingle(req, res, function (err) {
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

        if (req.file) {
            req.body.imagePath = `uploads/eventImages/${req.file.filename}`;
        }

        next();
    });
};

module.exports = { handleEventUpload };