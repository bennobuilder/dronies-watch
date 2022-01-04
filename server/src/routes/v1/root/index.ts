import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Root! v1');
});

export default router;
