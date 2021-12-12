import express from 'express';
import reportController from '../controllers/report.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.get('/reports/:evaluationId', reportController.getReport);
router.post(
  '/reports/:evaluationId/users/:uid',
  reportController.createReportEntry
);
router.put(
  '/reports/:evaluationId/users/:uid',
  reportController.updateReportEntry
);

export = router;
