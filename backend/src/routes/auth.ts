import express from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.post('/auth/google', authController.googleAuth);

export = router;
