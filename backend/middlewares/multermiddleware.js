const multer = require('multer');

// Define the storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/'); // Destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
    }
});

// Create the multer instance with the storage configuration
const uploads = multer({ storage: storage });

module.exports = uploads; // Export the multer instance
