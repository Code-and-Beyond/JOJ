import express from 'express';
import submissionController from '../controllers/submission.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.get(
  '/submissions/:submissionId',
  submissionController.getSubmissionById
);

export = router;
