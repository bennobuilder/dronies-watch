import express from 'express';

// Routes
import v1Routes from './v1';

const router = express.Router();

router.use('/v1', v1Routes);

export default router;
