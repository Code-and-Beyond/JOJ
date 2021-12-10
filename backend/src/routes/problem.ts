import express from 'express';
import problemController from '../controllers/problem.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.get(
  '/contests/:contestId/problems',
  problemController.getContestProblems
);
router.post(
  '/contests/:contestId/problems',
  problemController.createContestProblem
);
router.put('/problems/:problemId', problemController.updateProblem);

export = router;
