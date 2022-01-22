import { Router } from 'express';
import flappyDroniesRoutes from './flappydronie';
import memorydronieRoutes from "./memorydronie";

const router = Router();

router.use('/flappydronie', flappyDroniesRoutes);
router.use('/memorydronie', memorydronieRoutes);

export default router;
