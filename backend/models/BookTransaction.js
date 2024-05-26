import mongoose from "mongoose"

const BookTransactionSchema = new mongoose.Schema({
    bookId: {
        type: String,
        require: true
    },
    borrowerId: {
        type: String,
        require: true
    },
    DueDate: {
        type: Date,
        require: true,
    },
    transactionStatus: {
        type: String,
        default: "Active"
    }
},
);

export default mongoose.model("BookTransaction", BookTransactionSchema)