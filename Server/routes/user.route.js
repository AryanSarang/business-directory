import express from 'express';
import { applyConsultant, test, updateUser, getAllNotification, bookAppointment, getAllConsultantion, submitBlog, fetchConsultant, updateConsultant, getUserBlog, deleteBlog, updateBlog, contactUs, seenNotification } from '../controllers/user.controller.js';
import { verifyToken } from '../Utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.post('/applyconsultant', verifyToken, applyConsultant)
router.post("/get-all-notification", verifyToken, getAllNotification);
router.post("/get-all-consultations", verifyToken, getAllConsultantion);
router.post("/book-appointment", verifyToken, bookAppointment);
router.post("/blog-submit", verifyToken, submitBlog);
router.patch("/updateblog", verifyToken, updateBlog);
router.post("/fetchconsultant", verifyToken, fetchConsultant);
router.post("/updateconsultant", verifyToken, updateConsultant);
router.get("/getUserBlog", verifyToken, getUserBlog);
router.delete("/deleteblog/:id",verifyToken, deleteBlog)
router.post('/contactus', contactUs)
router.post('/seenotification',verifyToken ,seenNotification)
export default router;