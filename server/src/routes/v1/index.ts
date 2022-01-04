import express from 'express';

// Routes
import flappyDronieRoutes from './flappy-dronie';
import rootRoutes from './root';
import authRoutes from './auth';

const router = express.Router();

router.use('/', rootRoutes);
router.use('/flappy-dronie', flappyDronieRoutes);
router.use('/auth', authRoutes);

export default router;
