import express from 'express';
import courseController from '../controllers/course.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.get('/courses', courseController.getAllCourses);
router.get('/courses/:courseId', courseController.getCourseById);
router.get('/courses/codes/:code', courseController.getCourseByInviteCode);
router.post('/courses', courseController.createCourse);
router.put('/courses/:courseId', courseController.updateCourse);

// evaluations
router.get(
  '/courses/:courseId/evaluations',
  courseController.getCourseEvaluations
);
router.post(
  '/courses/:courseId/evaluations',
  courseController.createCourseEvaluation
);

export = router;
