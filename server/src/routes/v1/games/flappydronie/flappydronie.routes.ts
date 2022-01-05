import { Router } from 'express';
import { playedController } from './flappydronie.controller';

const router = Router();

router.use('/played', playedController);

export default router;
