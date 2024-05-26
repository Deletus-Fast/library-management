import express from "express";
import Comment from "../models/Comment.js";
import Book from "../models/Book.js";

const router = express.Router();

router.post("/addcomment", async (req, res) => {
    try {
        const newComment = await new Comment({
        comment: req.body.comment,
        userID: req.body.userID,
        bookID: req.body.bookID
        });
        const comment = await newComment.save();
        // const book = await Book.findOne({ isbn: req.body.bookID });
        // book.comments.push(comment._id);
        res.status(200).json(comment);
    } catch (err) {
        return res.status(504).json(err);
    }
    }
);

router.get("/allcomments/:bookID", async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.params.bookID })
        if(!book){
            return res.status(404).json("Book not found");
        }
            const comments = await Comment.find({ bookID: req.params.bookID });

        if (!comments) {
            return res.status(404).json("No comments found for this book");
        }

        // Extract comment IDs
        // const commentIds = book.comments.map(comment => comment._id);

        // Find comments using IDs
        // const comments = await Comment.find({ _id: { $in: commentIds } });

        // Extract only the necessary fields from each comment

        res.status(200).json(comments);
    } catch (err) {
        return res.status(504).json(err);
    }
});

export default router;