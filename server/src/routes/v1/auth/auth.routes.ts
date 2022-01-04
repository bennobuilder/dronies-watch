import express from 'express';
import {
  getDiscordApplicationIdController,
  authDiscordRedirectController,
  authDiscordRevokeController,
  getAuthenticatedDiscordUserController,
} from './auth.controller';

const router = express.Router();

router.get('/discord/applicationId', getDiscordApplicationIdController);
router.get('/discord/redirect', authDiscordRedirectController);
router.get('/discord/revoke', authDiscordRevokeController);
router.get('/discord/user', getAuthenticatedDiscordUserController);

export default router;
