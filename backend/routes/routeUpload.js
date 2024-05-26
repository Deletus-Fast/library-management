import express from "express";
const router = express.Router();
import cloudinary from "../utils/cloudinary.js";
import upload from "../middlewares/multer.js"

router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        // Upload image to cloudinary
        const filePath = "./public/Images/" + req.body.bookName+".jpg";
        cloudinary.uploader.upload(filePath, async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "Upload unsuccessful" });
            }
            res.status(200).json({ url: result.secure_url });
        });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


export default router;