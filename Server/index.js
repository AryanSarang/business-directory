import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import adminRouter from './routes/admin.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();
import { Server } from 'socket.io';
import { createServer } from "http";



mongoose.connect(process.env.MONGOURL).then(() => {
    console.log("Connected to MongoDB server");
}).catch((err) => {
    console.log(err);
})


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE"],
        credentials: true
    }
});
// app.use(express.json());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(cookieParser());

global.io = io;
global.userSockets = {};       // { userId: socketId }
global.consultantSockets = {}; // { consultantId: socketId }
global.adminSockets = {};

io.on('connection', (socket) => {
    // Handle user login
    socket.on('user-login', (userId) => {
        global.userSockets[userId] = socket.id;

    });

    // Handle consultant login
    socket.on('consultant-login', (consultantId) => {
        global.consultantSockets[consultantId] = socket.id;
        global.userSockets[consultantId] = socket.id;

    });

    // Handle admin login
    socket.on('admin-login', (adminId) => {
        global.adminSockets[adminId] = socket.id;
    });

    // Handle socket disconnection
    socket.on('disconnect', () => {
        // Clean up global socket storage
        for (const [key, value] of Object.entries(global.userSockets)) {
            if (value === socket.id) {
                delete global.userSockets[key];
                break;
            }
        }
        for (const [key, value] of Object.entries(global.consultantSockets)) {
            if (value === socket.id) {
                delete global.consultantSockets[key];
                break;
            }
        }
        for (const [key, value] of Object.entries(global.adminSockets)) {
            if (value === socket.id) {
                delete global.adminSockets[key];
                break;
            }
        }
    });
});


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
server.listen(3000, () => {
    console.log("Server running on port 3000")
});