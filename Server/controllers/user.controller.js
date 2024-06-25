import User from "../Models/User.model.js";
import { errorHandler } from "../Utils/error.js";
import bcryptjs from 'bcryptjs';
import Consultant from '../Models/Consultant.model.js';
import Appointment from '../Models/Appointments.model.js';
import moment from 'moment-timezone';


export const test = (req, res) => {
    res.json({
        message: "API route is working",
    });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'Unauthorized'));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const applyConsultant = async (req, res, next) => {
    try {
        const { userId } = req.body;

        const existingConsultant = await Consultant.findOne({ userId });
        if (existingConsultant) {
            return res.status(400).send({
                success: false,
                message: 'A consultant account already exists with this email.'
            });
        }
        const newConsultant = await Consultant({ ...req.body })
        await newConsultant.save();
        const adminUser = await User.findOne({ isAdmin: true })
        const notification = adminUser.notification
        notification.push({
            type: 'apply-consultant',
            message: `${newConsultant.name} has applied to become a consultant`,
            data: {
                consultantId: newConsultant._id,
                name: newConsultant.name,
                onClickPath: '/admin/consultants'
            },
            timestamp: new Date()
        })
        await User.findByIdAndUpdate(adminUser._id, { notification });

        res.status(201).send({
            success: true,
            message: 'Consultant details will be reviewed'
        });
    } catch (error) {
        next(error);
    }
};
export const getAllNotification = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.body.userId }).select("-password");
        // const seenNotification = user.seenNotification;
        // const notification = user.notification;

        res.status(200).send({
            success: true,
            message: 'All notification marked as read',
            data: user,
        });
        // seenNotification.push(...notification);
        // user.notification = [];
        // user.seenNotification = seenNotification;
        // const updatedUser = await user.save();
    } catch (error) {
        next(error);
    }
}

export const getAllConsultantion = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.body.userId }).select("-password");
        res.status(200).send({
            success: true,
            message: 'All consultations fetched',
            data: user.consultation,
        });

    } catch (error) {
        next(error);
    }
}

export const bookAppointment = async (req, res, next) => {
    try {
        const newAppointment = new Appointment(req.body);

        await newAppointment.save();

        const consultant = await Consultant.findOne({ _id: req.body.consultantId });
        const consultantUser = await User.findOne({ _id: consultant.userId });
        const user = await User.findOne({ _id: req.body.userId }).select("-password");
        const admin = await User.findOne({ isAdmin: true }).select("-password");

        let indianDate = moment(req.body.appointmentDate).tz('Asia/Kolkata').format('llll');
        console.log(indianDate);

        consultantUser.notification.push({
            type: "New-appointment-request",
            message: `A new ${req.body.specialization} appointment request from ${user.username} at ${indianDate}`,
            timestamp: new Date()
        });
        consultantUser.save();
        user.notification.push({
            type: "New-appointment-request",
            message: `Your appointment for ${req.body.specialization} with ${consultant.name} has been booked for ${indianDate}, you will soon recieve a phone call on ${req.body.userPhone}`,
            timestamp: new Date()
        });
        user.save();
        user.consultation.push({
            consultant: consultant.name,
            date: indianDate,
            status: "requested",
            timestamp: new Date()
        })
        admin.notification.push({
            type: "New-appointment-request",
            message: `A new  ${req.body.specialization} appointment request from @${user.username} for ${consultant.name} at ${indianDate}, user phone: ${req.body.userPhone}`,
            data: {
                consultantId: req.body.consultantId,
                userId: user._id,
                appointmentDate: req.body.appointmentDate,
                onClickPath: `/consultant/${req.body.consultantId}`,
                userPhone: req.body.userPhone
            },
            timestamp: new Date()

        });
        admin.save();
        res.status(200).send({
            success: true,
            message: 'Appointment booked'
        });
    } catch (error) {
        next(error);
    }
};
