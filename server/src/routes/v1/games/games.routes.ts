import { Router } from 'express';
import flappyDroniesRoutes from './flappydronie';

const router = Router();

router.use('/flappydronie', flappyDroniesRoutes);

export default router;
