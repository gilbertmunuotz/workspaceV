const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../frontend/public')); // Using path.join for cross-platform compatibility
        //It gets the directory of the currently executing file and then joining it with the relative path to the destination directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Generates a unique filename
    }
});

const uploads = multer({ storage: storage });
module.exports = uploads;