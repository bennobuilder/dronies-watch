import { Router } from 'express';
import {
  playedController,
  recentHighScoresController,
} from './memorydronie.controller';

const router = Router();

router.post('/played', playedController);
router.get('/recent-highscores', recentHighScoresController);

export default router;
