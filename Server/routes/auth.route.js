import express from 'express';
import { signup, login, google, signOut, getAllConsultants, getConsultantById, getAllBlogs, getBlogById, checkUrl, getRelatedBlogs } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post('/google', google);
router.get('/logout', signOut);
router.get('/allconsultants', getAllConsultants);
router.post('/getConsultantById', getConsultantById);
router.get("/allblogs", getAllBlogs);
router.post("/getBlogById", getBlogById);
router.get("/checkurl", checkUrl);
router.get("/getrelatedblogs", getRelatedBlogs);

export default router;