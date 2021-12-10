import express from 'express';
import evalReportController from '../controllers/evalReport.controller';
// import auth from '../middleware/auth';

const router = express.Router();

// reports/:evalId
router.get('/evaluations/:evalId/reports', evalReportController.getEvalReport);
// reports/users
// users/:uid/reports
router.get(
  '/evaluations/reports/users/:uid',
  evalReportController.getEvalReportsForUser
);
router.post(
  '/evaluations/:evalId/reports/users/:uid',
  evalReportController.createEvalReportEntry
);
router.put(
  '/evaluations/:evalId/reports/users/:uid',
  evalReportController.updateEvalReportEntry
);

export = router;
