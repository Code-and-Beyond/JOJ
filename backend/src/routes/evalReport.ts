import express from 'express';
import evalReportController from '../controllers/evalReport.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.get('/reports/:evalId', evalReportController.getEvalReport);
router.get('/users/:uid/reports', evalReportController.getEvalReportsForUser);
router.post(
  '/reports/:evalId/users/:uid',
  evalReportController.createEvalReportEntry
);
router.put(
  '/reports/:evalId/users/:uid',
  evalReportController.updateEvalReportEntry
);

export = router;
