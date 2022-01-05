import express from 'express';
import { getUserController } from './user.controller';

const router = express.Router();

router.get('/current', getUserController);

export default router;
