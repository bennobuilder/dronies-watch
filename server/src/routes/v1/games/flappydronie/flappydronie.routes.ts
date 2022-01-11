import { Router } from 'express';
import {
  playedController,
  recentHighscoresConroller,
} from './flappydronie.controller';

const router = Router();

router.post('/played', playedController);
router.get('/recent-highscores', recentHighscoresConroller);

export default router;
