import express from "express"
import Book from "../models/Book.js"
import BookTransaction from "../models/BookTransaction.js"
import User from "../models/User.js"

const router = express.Router()

router.post("/add-transaction", async (req, res) => {
    try {
        // Check if the request is from an admin
        if (req.body.isAdmin === true) {
            // Find the book by name
            const book = await Book.findOne({ isbn: req.body.bookId });
            const user = User.findOne({admissionId: req.body.borrowerId})

            // Check if the book is already unavailable
            if (book.bookStatus === "Unavailable") {
                return res.status(400).json({ error: "Book is already issued" });
            }
            else if(book.count === 0){
                return res.status(400).json({ error: "Book is out of stock" });
            }
            else if(!user)
            {
                return res.status(400).json({ error: "User not found" });
            }
            else{

            // Create a new book transaction
            const newTransaction = await BookTransaction.create({
                bookId: req.body.bookId,
                borrowerId: req.body.borrowerId,
                DueDate: req.body.toDate
            });
            newTransaction.save();

            console.log(newTransaction)

            // Update book status and currentTransaction
            book.bookStatus = "Issued";
            await book.updateOne({ $push: { transaction: newTransaction._id } })
            book.count = book.count - 1;
            await book.save();

            // Send the transaction data as response
            res.status(200).json(newTransaction);
            }
        } else {
            // If not an admin, return unauthorized error
            res.status(403).json({ error: "Unauthorized: You are not allowed to add a transaction" });
        }
    } catch (err) {
        console.error("Error adding transaction:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});



router.get("/all-transactions", async (req, res) => {
    try {
        const transactions = await BookTransaction.find({}).sort({ _id: -1 })
        res.status(200).json(transactions)
    }
    catch (err) {
        return res.status(504).json(err)
    }
})

router.put("/update-transaction/:id", async (req, res) => {
    try {
        if (req.body.isAdmin) {
            await BookTransaction.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Transaction details updated successfully");
        }
    }
    catch (err) {
        res.status(504).json(err)
    }
})

router.delete("/remove-transaction/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const data = await BookTransaction.findByIdAndDelete(req.params.id);
            const book = Book.findById(data.bookId)
            console.log(book)
            await book.updateOne({ $pull: { transactions: req.params.id } })
            res.status(200).json("Transaction deleted successfully");
        } catch (err) {
            return res.status(504).json(err);
        }
    } else {
        return res.status(403).json("You dont have permission to delete a book!");
    }
})
// Return book
router.post("/return-book", async (req, res) => {
    try {
        const { bookId, borrowerId } = req.body;

        // Find the book by ID
        const book = await Book.findOne({ isbn: req.body.bookId});
        const user = User.find({admissionId: req.body.borrowerId})


        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        if(!User){
            return res.status(404).json({ error: "User not found" });
        }

        // Find the transaction by bookId and borrowerId
        const transaction = await BookTransaction.findOne({ bookId: bookId, borrowerId: borrowerId, transactionStatus: "Active"});
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        else{

        // Update book status to "Available"
        book.bookStatus = "Available";
        book.count = book.count + 1;
        await book.save();

        // Update transaction status to "Returned" and set the return date
        transaction.transactionStatus = "Returned";
        transaction.returnDate = new Date();
        await transaction.save();

        res.status(200).json("Book returned successfully");
        }
    }
    catch (err) {
        console.error("Error returning book:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

//get all transactions of a user
router.get("/user-transactions/:id", async (req, res) => {
    try {
        const transactions = await BookTransaction.find({ borrowerId: req.params.id }).sort({ _id: -1 })
        res.status(200).json(transactions)
    }
    catch (err) {
        return res.status(504).json(err)
    }
})


router.post("/user-transactions", async (req, res) => {
    try {
        const { borrowerId } = req.body;

        // Find all active transactions for the provided borrower ID
        const transactions = await BookTransaction.find({ borrowerId, transactionStatus: "Active" }).sort({ _id: -1 });

        // Return the list of active transactions
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router