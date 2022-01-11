import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';

export const { rateLimiterMiddleware } = (() => {
  // const rateLimiterRedis = new RateLimiterRedis({
  //   storeClient: redisClient,
  //   points: 10, // Number of points
  //   duration: 1, // Per second
  // });

  // TODO // https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example#authorized-and-not-authorized-users
  function rateLimiterMiddleware (req: Request, res: Response, next: NextFunction) {
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

export async function cryptoMiddleware(req: Request, res: Response, next: NextFunction){
// TODO decrypt json bodies
}
