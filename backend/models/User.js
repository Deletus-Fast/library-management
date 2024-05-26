import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   
    admissionId: {
        type: String,
        min: 3,
        max: 15,
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    activeTransactions: [{
        type: mongoose.Types.ObjectId,
        ref: "BookTransaction"
    }],
    isAdmin: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });

export default mongoose.model("User", UserSchema);