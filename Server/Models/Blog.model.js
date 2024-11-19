import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    featuredImage: {
        type: String,
        default: "https://st.depositphotos.com/1323882/3010/i/380/depositphotos_30101161-stock-photo-blue-mouse-and-cable-in.jpg"
    },
    content: {
        type: String,
        default: "",
        required: true
    },
    tags: {
        type: Array,
        default: []
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true,
    },
    approved: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;