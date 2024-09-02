import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import adminRouter from './routes/admin.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();




mongoose.connect(process.env.MONGOURL).then(() => {
    console.log("Connected to MongoDB server");
}).catch((err) => {
    console.log(err);
})


const app = express();
app.use(express.json());

app.use(cookieParser());



app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})



// run sever
app.listen(3000, () => {
    console.log("Server running on port 3000")
});