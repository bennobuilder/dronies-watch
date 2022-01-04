import express from 'express';
import { getUserController } from './user.controller';

const router = express.Router();

router.get('/discord/user', getUserController);

export default router;
