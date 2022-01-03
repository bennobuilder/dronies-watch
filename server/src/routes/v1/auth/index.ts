import express from 'express';
import config from '../../../config';

const router = express.Router();

router.get('/discord/applicationId', (req, res, next) => {
  res.send({ applicationId: config.discord.APPLICATION_ID });
});

router.get('/discord/redirect', (req, res, next) => {
  console.log(req.query);
  res.send(200);
});

export default router;
