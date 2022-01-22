import { Router } from 'express';
import flappyDroniesRoutes from './flappydronie';
import memoryDronieRoutes from "./memorydronie";

const router = Router();

router.use('/flappydronie', flappyDroniesRoutes);
router.use('/memorydronie', memoryDronieRoutes);

export default router;
