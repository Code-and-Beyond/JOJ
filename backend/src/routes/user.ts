import express from 'express';
import userController from '../controllers/user.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:uid', userController.getUserByUid);
router.post('/users', userController.createUser);
router.put('/users/:uid', userController.updateUser);

// courses
router.get('/users/:uid/courses', userController.getUserCourses);

// reports
router.get('/users/:uid/reports', userController.getUserReports);

export = router;
