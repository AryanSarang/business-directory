import User from "../Models/User.model.js";
import { errorHandler } from "../Utils/error.js";
import bcryptjs from 'bcryptjs';
import Consultant from '../Models/Consultant.model.js';
import Appointment from '../Models/Appointments.model.js';
import moment from 'moment-timezone';
import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

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
                    phone: req.body.phone
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

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: newConsultant.email,
            subject: 'Applied for Consultant',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <div style="background-color: #f7f7f7; padding: 10px 20px; text-align: center;">
                        <img src="https://scontent.fjai2-4.fna.fbcdn.net/v/t39.30808-6/326199203_853842605872148_2610728013556829022_n.png?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=36QVIa-pDYIQ7kNvgE0NulF&_nc_ht=scontent.fjai2-4.fna&oh=00_AYDTzG_Up7HcgSrGJPiawTrv3HUpmWfl2Q70Rfq_tVE6hA&oe=6680292C"
                        alt="Company Logo" style="max-width: 150px; height: auto;">
                    </div>
                    <div style="padding: 20px;">
                        <p>Hi ${newConsultant.name},</p>
                        <p>Your application for becoming a consultant is recieved with following details:</p>
                        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Name</th>
                                <td>${newConsultant.name}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Category</th>
                                <td>${newConsultant.specialization}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Experience</th>
                                <td>${newConsultant.experience}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Years of experience</th>
                                <td>${newConsultant.experienceYear}</td>
                            </tr>
                              <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Your linkedIn URL</th>
                                <td>${newConsultant.linkedinUrl}</td>
                            </tr>
                             <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Fees</th>
                                <td>${newConsultant.feesPerConsultation}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Phone</th>
                                <td>${newConsultant.phone}</td>
                            </tr>
                        </table>
                        <p>Your details are being verified, you will soon recieve a confirmation mail from us.</p>
                        <p>Best regards,<br>Your Company</p>
                    </div>
                    <div style="background-color: #f7f7f7; padding: 10px 20px; text-align: center;">
                        <p style="font-size: 12px; color: #777;">&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                    </div>
                </div>
            `
        };
        await transporter.sendMail(mailOptions);

        const mailOptions2 = {
            from: process.env.EMAIL_USER,
            to: adminUser.email,
            subject: 'Applied for Consultant',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <div style="background-color: #f7f7f7; padding: 10px 20px; text-align: center;">
                        <img src="https://scontent.fjai2-4.fna.fbcdn.net/v/t39.30808-6/326199203_853842605872148_2610728013556829022_n.png?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=36QVIa-pDYIQ7kNvgE0NulF&_nc_ht=scontent.fjai2-4.fna&oh=00_AYDTzG_Up7HcgSrGJPiawTrv3HUpmWfl2Q70Rfq_tVE6hA&oe=6680292C"
                        alt="Company Logo" style="max-width: 150px; height: auto;">
                    </div>
                    <div style="padding: 20px;">
                        <p>Hi admin,</p>
                        <p>Your application for becoming a consultant is recieved with following details:</p>
                        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Name</th>
                                <td>${newConsultant.name}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Category</th>
                                <td>${newConsultant.specialization}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Experience</th>
                                <td>${newConsultant.experience}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Years of experience</th>
                                <td>${newConsultant.experienceYear}</td>
                            </tr>
                              <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Your linkedIn URL</th>
                                <td>${newConsultant.linkedinUrl}</td>
                            </tr>
                             <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Fees</th>
                                <td>${newConsultant.feesPerConsultation}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Phone</th>
                                <td>${newConsultant.phone}</td>
                            </tr>
                        </table>
                        <p>Your details are being verified, you will soon recieve a confirmation mail from us.</p>
                        <p>Best regards,<br>Your Company</p>
                    </div>
                    <div style="background-color: #f7f7f7; padding: 10px 20px; text-align: center;">
                        <p style="font-size: 12px; color: #777;">&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                    </div>
                </div>
            `
        };
        await transporter.sendMail(mailOptions2);
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
            data: {
                onClickPath: `/consultant/${req.body.consultantId}`
            },
            timestamp: new Date()
        });
        user.save();
        user.consultation.push({
            consultant: consultant.name,
            date: indianDate,
            status: "requested",
            data: {
                onClickPath: `/consultant/${req.body.consultantId}`
            },
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
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Consultation appointment booked',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <div style="background-color: #f7f7f7; padding: 10px 20px; text-align: center;">
                        <img src="https://scontent.fjai2-4.fna.fbcdn.net/v/t39.30808-6/326199203_853842605872148_2610728013556829022_n.png?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=36QVIa-pDYIQ7kNvgE0NulF&_nc_ht=scontent.fjai2-4.fna&oh=00_AYDTzG_Up7HcgSrGJPiawTrv3HUpmWfl2Q70Rfq_tVE6hA&oe=6680292C"
                        alt="Company Logo" style="max-width: 150px; height: auto;">
                    </div>
                    <div style="padding: 20px;">
                        <p>Hi</p>
                        <p>Your appointment for ${req.body.specialization} consultation is booked with the following details:</p>
                        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Consultant</th>
                                <td>${consultant.name}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Category</th>
                                <td>${req.body.specialization}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Date & time</th>
                                <td>${indianDate}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Phone</th>
                                <td>${req.body.userPhone}</td>
                            </tr>
                        </table>
                        <p>You will soon receive a phone call on ${req.body.userPhone}.</p>
                        <p>Best regards,<br>Your Company</p>
                    </div>
                    <div style="background-color: #f7f7f7; padding: 10px 20px; text-align: center;">
                        <p style="font-size: 12px; color: #777;">&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                    </div>
                </div>
            `
        };
        await transporter.sendMail(mailOptions);
        res.status(200).send({
            success: true,
            message: 'Appointment booked'
        });
    } catch (error) {
        next(error);
    }
};
