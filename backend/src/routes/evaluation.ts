import express from 'express';
import evaluationController from '../controllers/evaluation.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.put('/evaluations/:evalId', evaluationController.updateEvaluation);

// submissions
router.get(
  '/evaluations/:evalId/submissions',
  evaluationController.getEvaluationSubmissions
);

export = router;
