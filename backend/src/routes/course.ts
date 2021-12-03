import express from "express";
import courseController from '../controllers/course.controller';
import auth from '../middleware/auth';

const router = express.Router();


router.post('/add-course', auth.authenticateToken, auth.restrictTo('admin'), courseController.addCourse);

export = router;