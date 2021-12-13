import express from 'express';
import clubController from '../controllers/club.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.get('/clubs', clubController.getAllClubs);
router.get('/clubs/:clubId', clubController.getClubById);
router.post('/clubs', clubController.createClub);
router.put('/clubs/:clubId', clubController.updateClub);

// contests
router.get('/clubs/:clubId/contests', clubController.getClubContests);
router.post('/clubs/:clubId/contests', clubController.createClubContest);

export = router;
