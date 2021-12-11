import express from 'express';
import evalReportController from '../controllers/report.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.get('/reports/:evalId', evalReportController.getReport);
router.post(
  '/reports/:evalId/users/:uid',
  evalReportController.createReportEntry
);
router.put(
  '/reports/:evalId/users/:uid',
  evalReportController.updateReportEntry
);

export = router;
