import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/Images'); // Save images to the public/images folder
    },
    filename: function (req, file, cb) {
        const filename = `${req.body.bookName}.jpg`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

export default upload;