import express from 'express';
import userController from '../controllers/user.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.get('/get/user', userController.getAllUsers);

export = router;
