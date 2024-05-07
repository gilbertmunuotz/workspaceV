var multer = require('multer');

const storage = multer.diskStorage({
    destination: 'public/images/', // Public folder for uploads
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Specifies Unique filename
    }
});

export const uploads = multer({ storage: storage });