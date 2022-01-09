import express from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';

export const { rateLimiterMiddleware } = (() => {
  // const rateLimiterRedis = new RateLimiterRedis({
  //   storeClient: redisClient,
  //   points: 10, // Number of points
  //   duration: 1, // Per second
  // });

  // TODO // https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example#authorized-and-not-authorized-users
  const rateLimiterMiddleware = (req, res, next) => {
    // rateLimiterRedis
    //   .consume(req.ip)
    //   .then(() => {
    //     next();
    //   })
    //   .catch((_) => {
    //     res.status(429).send('Too Many Requests');
    //   });
    return next();
  };

  return { rateLimiterMiddleware };
})();
