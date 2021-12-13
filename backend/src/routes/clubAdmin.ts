import express from 'express';
import clubAdminController from '../controllers/clubAdmin.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.get('/clubs/:clubId/admins', clubAdminController.getClubAdmins);
router.post('/clubs/:clubId/admins/:uid', clubAdminController.pushClubAdmin);
router.delete(
  '/clubs/:clubId/admins/:uid',
  clubAdminController.deleteClubAdmin
);

export = router;
