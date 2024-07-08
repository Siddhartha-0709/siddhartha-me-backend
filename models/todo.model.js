import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    userEmail:{
        type: String,
        required: true
    }
}, {timestamps: true});
export default mongoose.model('Todo', todoSchema);