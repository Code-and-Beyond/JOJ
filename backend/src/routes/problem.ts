import express from 'express';
import problemController from '../controllers/problem.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.put('/problems/:problemId', problemController.updateProblem);

// testcases
router.get(
  '/problems/:problemId/testcases',
  problemController.getProblemTestcases
);
router.post(
  '/problems/:problemId/testcases',
  problemController.createProblemTestcase
);

export = router;
