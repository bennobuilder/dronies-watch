import express from 'express';
import {
  authDiscordLoginController,
  authDiscordRedirectController,
  authDiscordRevokeController,
} from './auth.controller';

const router = express.Router();

router.get('/discord/login', authDiscordLoginController);
router.get('/discord/redirect', authDiscordRedirectController);
router.get('/discord/revoke', authDiscordRevokeController);

export default router;
