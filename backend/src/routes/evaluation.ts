import express from 'express';
import evaluationController from '../controllers/evaluation.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.put('/evaluations/:evalId', evaluationController.updateEvaluation);

export = router;
