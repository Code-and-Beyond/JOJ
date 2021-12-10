import express from 'express';
import evaluationController from '../controllers/evaluation.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.get(
  '/evaluations/courses/:courseId', // courses/:courseId/evaluations
  evaluationController.getEvaluationsOfCourse
);
router.post(
  '/evaluations/courses/:courseId',
  evaluationController.createEvaluation
);
router.put('/evaluations/:evalId', evaluationController.updateEvaluation);

export = router;
