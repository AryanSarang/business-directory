import User from "../Models/User.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../Utils/error.js";
import jwt from 'jsonwebtoken';
import Consultant from "../Models/Consultant.model.js";
import Blog from "../Models/Blog.model.js";

 


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest } = newUser._doc;
        res.cookie('access_token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    const { identifier, password } = req.body;
    try {
        const validUser = await User.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        });

        if (!validUser) return next(errorHandler(404, "No account found for this email or username"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest } = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            .status(200)
            .json(rest);
    }
    catch (error) {
        next(error);
    }
}

export const googleAuth = async (req, res, next) => {
    try {
        console.log(req.body);
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = user._doc;

            res.cookie('access_token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json("User has been logged out!");
    } catch (error) {
        next(error);
    }
}

export const getAllConsultants = async (req, res, next) => {
    try {
        const consultants = await Consultant.find({ "approved": "approved" });
        res.status(200).send({
            success: true,
            message: 'consultants list',
            data: consultants
        })
    } catch (error) {
        next(error);
    }

}

export const getConsultantById = async (req, res, next) => {
    try {
        const consultant = await Consultant.findOne({ _id: req.body.consultantId });

        res.status(200).send({
            success: true,
            message: 'Single consultant',
            data: consultant
        })
    } catch (error) {
        next(error);
    }

}
export const checkUrl = async (req, res, next) => {
    try {
        const url = req.query.url;
        const exists = await Blog.exists({ url });
        res.json({ exists });
    } catch (error) {
        next(error);
    }
};
export const getAllBlogs = async (req, res, next) => {
    try {

        const { page = 1, limit = 10, tag = 'All' } = req.query;
        const skip = (page - 1) * limit;
        let filter = { "approved": "approved" };
        if (tag !== 'All') {
            filter.tags = tag;
        }

        const blogs = await Blog.find(filter)
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const totalBlogs = await Blog.countDocuments({ approved: "approved", ...(tag !== 'All' && { tags: tag }) });

        res.status(200).send({
            success: true,
            message: 'blogs list',
            data: blogs,
            totalBlogs,
        });
    } catch (error) {
        next(error);
    }
}

export const getBlogById = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ url: req.body.blogUrl });
        res.status(200).send({
            success: true,
            message: 'Single blog',
            data: blog
        });
    } catch (error) {
        next(error);
    }
}

export const getRelatedBlogs = async (req, res, next) => {
    try {
        const currentBlogId = req.query.id;
        const currentBlog = await Blog.findById(currentBlogId);
        if (!currentBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const tags = currentBlog.tags;

        const relatedBlogs = await Blog.find({
            _id: { $ne: currentBlogId },
            tags: { $in: tags },
            approved: "approved"
        })
            .sort({ createdAt: -1 })
            .limit(3);

        res.json(relatedBlogs);
    } catch (error) {
        next(error);
    }
};