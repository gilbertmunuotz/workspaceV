var multer = require('multer');

const storage = multer.diskStorage({
    destination: 'public/', // Public folder for uploads
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Specifies Unique filename
    }
});

const uploads = multer({ storage: storage });
module.exports = uploads;