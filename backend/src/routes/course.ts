import express from "express";
import courseController from '../controllers/course.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.post('/create/course', courseController.createCourse);
router.get('/get/courses', courseController.getAllCourses);

export = router;