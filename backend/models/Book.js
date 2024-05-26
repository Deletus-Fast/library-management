
import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    bookName:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    language:{
        type:String,
        default:""
    },
    isbn:{
        type:String,
        default:""
    },
    publisher:{
        type:String,
        default:""
    },
    bookStatus:{
        type:String,
        default:"Available"
    },
    categories:{ 
        type: String,
        default:"" 
    },
    transaction:[{
        type:mongoose.Types.ObjectId,
        ref:"BookTransaction"
    }],
    image:{
        type:String,
        default:""
    },
    Comments:[{
        type:mongoose.Types.ObjectId,
        ref:"Comment"
    }],
    count:{
        type:Number,
        default:1
    }

},
{
    timestamps:true
});

export default mongoose.model("Book", BookSchema);