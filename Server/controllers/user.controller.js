import User from "../Models/User.model.js";
import { errorHandler } from "../Utils/error.js";
import bcryptjs from 'bcryptjs';
import Consultant from '../Models/Consultant.model.js';
import Appointment from '../Models/Appointments.model.js';
import Blog from '../Models/Blog.model.js';
import moment from 'moment-timezone';
import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';
import Contact from "../Models/Contact.model.js";


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
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password,
                    avatar: req.body.avatar,
                    phone: req.body.phone
                },
            },
            { new: true }
        );


        if (req.body.avatar && updatedUser.isConsultant) {
            await Consultant.updateOne(
                { userId: updatedUser._id },
                { $set: { avatar: req.body.avatar } }
            );
        }

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
        const admins = await User.find({ isAdmin: true }).select("-password");

        admins.forEach(admin => {
            admin.notification.push({
                type: 'apply-consultant',
                message: `${newConsultant.name} has applied to become a consultant`,
                data: {
                    consultantId: newConsultant._id,
                    name: newConsultant.name,
                    onClickPath: '/admin/consultants'
                },
                timestamp: new Date()
            })
        })

        admins.forEach(admin => {
            admin.save().then(() => {
                if (global.io && global.adminSockets[admin._id]) {
                    global.io.to(global.adminSockets[admin._id]).emit('apply-consultant', {
                        success: true,
                        data: admin
                    })
                }
            })
        })



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

        for (const admin of admins) {
            if (global.io && global.adminSockets && global.adminSockets[admin._id]) {
                global.io.to(global.adminSockets[admin._id]).emit('admin-notification', {
                    success: true,
                    message: `New appointment booked: ${req.body.specialization}`,
                });
            }
            const mailOptions2 = {
                from: process.env.EMAIL_USER,
                to: admin.email,
                subject: 'Applied for Consultant',
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <div style="background-color: #f7f7f7; padding: 10px 20px; text-align: center;">
                            <img src="https://scontent.fjai2-4.fna.fbcdn.net/v/t39.30808-6/326199203_853842605872148_2610728013556829022_n.png?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=36QVIa-pDYIQ7kNvgE0NulF&_nc_ht=scontent.fjai2-4.fna&oh=00_AYDTzG_Up7HcgSrGJPiawTrv3HUpmWfl2Q70Rfq_tVE6hA&oe=6680292C"
                            alt="Company Logo" style="max-width: 150px; height: auto;">
                        </div>
                        <div style="padding: 20px;">
                            <p>Hi admin,</p>
                            <p>${newConsultant.name} has applied for a consultant with the following details:</p>
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
                            <p>Please verify the details and approve or reject the request.</p>
                            <p>Best regards,<br>Your Company</p>
                        </div>
                        <div style="background-color: #f7f7f7; padding: 10px 20px; text-align: center;">
                            <p style="font-size: 12px; color: #777;">&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                        </div>
                    </div>
                `
            };
            await transporter.sendMail(mailOptions2);
        }
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
        const admins = await User.find({ isAdmin: true }).select("-password");

        let indianDate = moment(req.body.appointmentDate).tz('Asia/Kolkata').format('llll');
        console.log(indianDate);





        //consultant 
        consultantUser.notification.push({
            type: "New-appointment-request",
            message: `A new ${req.body.specialization} appointment request from ${user.username} at ${indianDate}`,
            timestamp: new Date()
        });
        await consultantUser.save();


        //user
        user.notification.push({
            type: "New-appointment-request",
            message: `Your appointment for ${req.body.specialization} with ${consultant.name} has been booked for ${indianDate}, you will soon recieve a phone call on ${req.body.userPhone}`,
            data: {
                onClickPath: `/consultant/${req.body.consultantId}`
            },
            timestamp: new Date()
        });

        user.consultation.push({
            consultant: consultant.name,
            date: indianDate,
            status: "requested",
            data: {
                onClickPath: `/consultant/${req.body.consultantId}`
            },
            timestamp: new Date()
        })

        await user.save();
        if (global.io && global.userSockets[user._id]) {
            global.io.to(global.userSockets[user._id]).emit('consultant-update', {
                success: true,
                data: user, // Add consultation data if applicable
            });
        }

        if (global.io && global.consultantSockets[consultantUser._id]) {
            console.log("user", global.userSockets)
            global.io.to(global.consultantSockets[consultantUser._id]).emit('consultant-update', {
                success: true,
                data: consultantUser, // Add consultation data if applicable
            });
        }


        //admin
        admins.forEach(admin => {

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
        })
        admins.forEach(admin => {
            admin.save().then(() => {
                if (global.io && global.adminSockets[admin._id]) {
                    global.io.to(global.adminSockets[admin._id]).emit('consultant-update', {
                        success: true,
                        data: admin,
                    });
                }
            });
        });


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


export const submitBlog = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.body.userId }).select("-password");
        const newBlog = new Blog(req.body);

        await newBlog.save();
        user.blogs.push(newBlog._id);
        const admins = await User.find({ isAdmin: true }).select("-password");

        const adminNotificationTemplate = {
            type: 'blog-submit',
            message: `${user.username} has submitted a new blog ${req.body.title} and is waiting for the review`,
            data: {
                userId: user._id,
                name: user.username,
                onClickPath: '/admin/blogs'
            },
            timestamp: new Date()
        };

        admins.forEach(admin => {
            admin.notification.push(adminNotificationTemplate);
        })

        admins.forEach(admin => {
            admin.save().then(() => {
                if (global.io && global.adminSockets[admin._id]) {
                    global.io.to(global.adminSockets[admin._id]).emit('blog-approve', {
                        success: true,
                        data: admin
                    })
                }
            })
        })


        // for (const adminUser of adminUsers) {
        //     const adminNotification = adminUser.notification || [];
        //     adminNotification.push(adminNotificationTemplate);

        //     await User.findByIdAndUpdate(adminUser._id, { notification: adminNotification });
        // }

        const userNotification = {
            type: 'Update BLog',
            message: `You have updated ur blog with, ${req.body.title} `,
            data: {
                consultantId: user._id,
                name: user.username,
                onClickPath: `/blog/${req.body.url}`
            },
            timestamp: new Date()
        }
        user.notification.push(userNotification);
        user.save().then(() => {
            if (global.io && global.userSockets[user._id]) {
                global.io.to(global.userSockets[user._id]).emit('blog-approve', {
                    success: true,
                    data: user, // Add consultation data if applicable
                });
            }
        });


        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'New Blog Submitted',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <div style="background-color: #f7f7f7; padding: 10px 20px; text-align: center;">
                        <img src="https://scontent.fjai2-4.fna.fbcdn.net/v/t39.30808-6/326199203_853842605872148_2610728013556829022_n.png?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=36QVIa-pDYIQ7kNvgE0NulF&_nc_ht=scontent.fjai2-4.fna&oh=00_AYDTzG_Up7HcgSrGJPiawTrv3HUpmWfl2Q70Rfq_tVE6hA&oe=6680292C"
                        alt="Company Logo" style="max-width: 150px; height: auto;">
                    </div>
                    <div style="padding: 20px;">
                        <p>Hi</p>
                        <p>Your blog ${req.body.title} is Blog with the following details:</p>
                        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Title</th>
                                <td>${req.body.title}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Title</th>
                                <td>${req.body.author}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Featured Image</th>
                                <td><img src="${req.body.featuredImage}" alt="featured" style="max-height: 350px; width: auto;"/></td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Tags</th>
                                <td>${req.body.tags}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Content</th>
                                <td>${req.body.content}</td>
                            </tr>
                            
                        </table>
                        <p>We are currently reviewing and it will be published soon</p>
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
            message: 'New blog submitted'
        });
    } catch (error) {
        next(error);
    }
}

export const updateBlog = async (req, res, next) => {
    try {
        const { blogId, ...body } = req.body;
        const user = await User.findOne({ _id: req.body.userId }).select("-password");
        if (user) {
            const updatedBlog = await Blog.findByIdAndUpdate(blogId, body, {
                new: true, // Return the updated document
                runValidators: true, // Ensure validation runs on the updated fields
            });
            if (!updatedBlog) {
                return res.status(404).json({ success: false, message: 'Blog not found' });
            }

            const userNotification = {
                type: 'apply-consultant',
                message: `Thank you for submitting your new blog, ${req.body.title}  We are currently reviewing it, and it will be published soon.`,
                data: {
                    consultantId: user._id,
                    name: user.username,
                    onClickPath: `/blog/${req.body.url}`
                },
                timestamp: new Date()
            }

            user.notification.push(userNotification);
            user.save().then(() => {
                if (global.io && global.userSockets[user._id]) {
                    global.io.to(global.userSockets[user._id]).emit('blog-update', {
                        success: true,
                        data: user, // Add consultation data if applicable
                    });
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Blog Updated',
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <div style="background-color: #f7f7f7; padding: 10px 20px; text-align: center;">
                            <img src="https://scontent.fjai2-4.fna.fbcdn.net/v/t39.30808-6/326199203_853842605872148_2610728013556829022_n.png?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=36QVIa-pDYIQ7kNvgE0NulF&_nc_ht=scontent.fjai2-4.fna&oh=00_AYDTzG_Up7HcgSrGJPiawTrv3HUpmWfl2Q70Rfq_tVE6hA&oe=6680292C"
                            alt="Company Logo" style="max-width: 150px; height: auto;">
                        </div>
                        <div style="padding: 20px;">
                            <p>Hi</p>
                            <p>Your new blog ${req.body.title} is submitted with the following details:</p>
                            <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                                <tr>
                                    <th style="background-color: #f7f7f7; text-align: left;">Title</th>
                                    <td>${req.body.title}</td>
                                </tr>
                                <tr>
                                    <th style="background-color: #f7f7f7; text-align: left;">Title</th>
                                    <td>${req.body.author}</td>
                                </tr>
                                <tr>
                                    <th style="background-color: #f7f7f7; text-align: left;">Featured Image</th>
                                    <td><img src="${req.body.featuredImage}" alt="featured" style="max-height: 350px; width: auto;"/></td>
                                </tr>
                                <tr>
                                    <th style="background-color: #f7f7f7; text-align: left;">Tags</th>
                                    <td>${req.body.tags}</td>
                                </tr>
                                <tr>
                                    <th style="background-color: #f7f7f7; text-align: left;">Content</th>
                                    <td>${req.body.content}</td>
                                </tr>
                                
                            </table>
                            <p>We are currently reviewing and it will be published soon</p>
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
                message: 'New blog submitted'
            });
            res.json({ success: true, data: updatedBlog });

        }
        else {
            return res.json({
                message: "Invalid User"
            })
        }
    }
    catch (error) {
        next(error)
    }

}

export const fetchConsultant = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const consultant = await Consultant.findOne({ userId: userId })
        res.status(200).json({
            success: true,
            data: consultant
        })
    } catch (error) {
        next(error);
    }
}

export const updateConsultant = async (req, res, next) => {
    try {

        const userId = req.user.id;
        if (userId) {
            const user = await User.findById(userId);
            if (user.isConsultant) {
                const body = req.body;

                await Consultant.findOneAndUpdate({ userId }, { $set: body }
                )
                res.status(200).json({
                    success: true,
                    message: "consultant details updated successfully"
                })
            }
            else {
                res.json({
                    message: "user is not consultant"
                })
            }
        }
    } catch (error) {
        next(error);
    }
}

export const getUserBlog = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if (userId) {
            const blog = await Blog.find({ userId });
            res.json({
                success: true,
                data: blog
            })
        }
        else {
            res.json({
                success: false,
                message: "no blog available"
            })
        }
    } catch (error) {
        next(error);
    }
}
export const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (id) {
            const blog = await Blog.findByIdAndDelete(id);
            if (blog) {
                res.json({
                    success: true,
                    message: "deleted succesfully"
                })
            }
        }
        else {
            res.json({
                success: false,
                message: "user not found"
            })

        }
    }
    catch (e) {
        next(e)
    }
}

export const seenNotification = async (req, res) => {
    try {

        const userId = req.body.userId;
        const user = await User.findById(userId).select("-password");
        if (user) {
            if (user.notification && user.notification.length > 0) {
                user.seenNotification = user.notification;
            }
            await user.save();
            res.json({
                success: true,
                data: user
            })
        }
    } catch (error) {
        res.json({
            error
        })
    }
}


export const contactUs = async (req, res) => {
    try {
        const body = req.body;
        await Contact.create(body);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: body.email,
            subject: 'Contact Us',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <div style="background-color: #f7f7f7; padding: 10px 20px; text-align: center;">
                        <img src="https://scontent.fjai2-4.fna.fbcdn.net/v/t39.30808-6/326199203_853842605872148_2610728013556829022_n.png?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=36QVIa-pDYIQ7kNvgE0NulF&_nc_ht=scontent.fjai2-4.fna&oh=00_AYDTzG_Up7HcgSrGJPiawTrv3HUpmWfl2Q70Rfq_tVE6hA&oe=6680292C"
                        alt="Company Logo" style="max-width: 150px; height: auto;">
                    </div>
                    <div style="padding: 20px;">
                        <p>Hi</p>
                        <p>Your Message  is submitted with the following details:</p>
                        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Title</th>
                                <td>${req.body.phone}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Title</th>
                                <td>${req.body.name}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Tags</th>
                                <td>${req.body.email}</td>
                            </tr>
                            <tr>
                                <th style="background-color: #f7f7f7; text-align: left;">Content</th>
                                <td>${req.body.message}</td>
                            </tr>
                            
                        </table>
                        <p>We are currently reviewing and it will be published soon</p>
                        <p>Best regards,<br>Your Company</p>
                    </div>
                    <div style="background-color: #f7f7f7; padding: 10px 20px; text-align: center;">
                        <p style="font-size: 12px; color: #777;">&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                    </div>
                </div>
            `
        };
        await transporter.sendMail(mailOptions);
        res.json({
            success: true,
            message: "Your message has been sent"
        })
    } catch (error) {
        console.log(error)
        res.json({
            error
        })
    }
}