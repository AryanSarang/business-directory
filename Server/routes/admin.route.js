import express from 'express';

import { verifyToken } from '../Utils/verifyUser.js';
import { getAllConsultantsController, getAllUsersController, consultantApprove, getAllConsultations, getAllBlogs, blogApprove } from '../controllers/admin.controller.js';
const router = express.Router();

router.get('/getAllUsers', verifyToken, getAllUsersController);
router.get('/getAllConsultants', verifyToken, getAllConsultantsController);
router.post('/consultantapprove', verifyToken, consultantApprove);
router.get('/getAllConsultations', verifyToken, getAllConsultations);
router.get('/getAllBlogs', verifyToken, getAllBlogs);
router.post('/blogapprove', verifyToken, blogApprove);

export default router;