import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
    comment:{
        type:String,
        require:true
    },
    userID:{
        type:String,
        require:true
    },
    bookID:{
        type:String,
        require:true
    }
},    
    {
        timestamps: true
    }
); 

export default mongoose.model("Comment", CommentSchema);