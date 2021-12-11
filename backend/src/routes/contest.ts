import express from 'express';
import contestController from '../controllers/contest.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.put('/contests/:contestId', contestController.updateContest);

// problems
router.get(
  '/contests/:contestId/problems',
  contestController.getContestProblems
);
router.post(
  '/contests/:contestId/problems',
  contestController.createContestProblem
);

export = router;
