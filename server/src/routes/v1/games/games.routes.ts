import { Router } from 'express';
import flappyDroniesRoutes from './flappydronie';

const router = Router();

router.use('/flappy-dronie', flappyDroniesRoutes);

export default router;
