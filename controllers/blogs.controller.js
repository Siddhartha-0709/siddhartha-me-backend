import { blog } from "../models/blog.model.js";
import uploadOnCloudinary from "../utils/cloudinary.util.js";
const uploadBlog = async (req, res) => {
    try {
        const { title, shortDescription } = req.body;
        console.table(req.body);
    
        console.log(req.files);


        const markdownFile = req.files.markdownFile[0].path;
        const thumbnailFile = req.files.thumbnailFile[0].path;
        const markdownUrl = await uploadOnCloudinary(markdownFile);
        const thumbnailUrl = await uploadOnCloudinary(thumbnailFile);

        const newBlog = new blog({
            title,
            markdownUrl,
            thumbnailUrl,
            shortDescription
        });
        await newBlog.save();
        res.status(201).json({
            message: "Blog created successfully",
            blog: newBlog,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating blog",
            error: error.message,
        });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blog.find();
        res.status(200).json({
            message: "Blogs fetched successfully",
            blogs,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching blogs",
            error: error.message,
        });
    }
}

const getBlogById = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blogData = await blog.findById(blogId);
        res.status(200).json({
            message: "Blog fetched successfully",
            blogData,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching blog",
            error: error.message,
        });
    }
}

const deleteBlogById = async (req, res) => {
    try {
        const blogId = req.params.id;
        await blog.findByIdAndDelete(blogId);
        res.status(200).json({
            message: "Blog deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting blog",
            error: error.message,
        });
    }
}

export { uploadBlog, getAllBlogs, getBlogById, deleteBlogById };