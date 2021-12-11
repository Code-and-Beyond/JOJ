import express from 'express';
import standingsController from '../controllers/standings.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.get('/standings/:contestId', standingsController.getStandings);
router.post(
  '/standings/:contestId/users/:uid',
  standingsController.createStandingsEntry
);
router.put(
  '/standings/:contestId/users/:uid',
  standingsController.updateStandingsEntry
);

export = router;
