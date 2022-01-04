import { Router } from 'express';
import flappyDroniesRoutes from './flappy-dronie';

const router = Router();

router.use('/flappy-dronie', flappyDroniesRoutes);

export default router;
