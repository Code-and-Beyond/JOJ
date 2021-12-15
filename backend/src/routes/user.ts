import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:uid', userController.getUserByUid);
router.post('/users', userController.createUser);
router.put('/users/:uid', userController.updateUser);

// courses
router.get('/users/:uid/courses', userController.getUserCourses);

// reports
router.get('/users/:uid/reports', userController.getUserReports);

// submissions
router.get('/users/:uid/submissions/', userController.getUserSubmissions);
router.get(
    '/users/:uid/contests/:contestId/submissions',
    userController.getUserContestSubmissions
);
router.get(
    '/users/:uid/evaluations/:evaluationId/submissions',
    userController.getUserEvaluationSubmissions
);
router.get(
    '/users/:uid/problems/:problemId/submissions',
    userController.getUserProblemSubmissions
);
router.post(
    '/users/:uid/problems/:problemId/submissions',
    userController.createUserProblemSubmission
);

export = router;
