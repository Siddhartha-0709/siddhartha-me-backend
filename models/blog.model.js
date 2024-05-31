import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    markdownUrl:{
        type: String,
        required: true
    },
    thumbnailUrl:{
        type: String,
        required: true
    },
    shortDescription:{
        type: String,
        required: true
    }
},{timestamps: true});

export const blog= mongoose.model('blog', blogSchema);