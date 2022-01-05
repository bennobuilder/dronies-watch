import express from 'express';
import {
  authDiscordRedirectController,
  authDiscordRevokeController,
} from './auth.controller';

const router = express.Router();

router.get('/discord/redirect', authDiscordRedirectController);
router.get('/discord/revoke', authDiscordRevokeController);

export default router;
