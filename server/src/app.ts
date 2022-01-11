import cors from 'cors';
import express, { json } from 'express';
import session from 'express-session';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import createHttpError from 'http-errors';
import routes from './routes';
import config from './config';
import { deserializeSession } from './middleware/session';
import { rateLimiterMiddleware } from './middleware/security';
import helmet from 'helmet';
import { cryptoJsonMiddleware } from './middleware/crypto';

// TODO ---
//  Failed to outsource this declarations into the global.d.ts file due to annoying errors
//   https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
//   https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
//   https://stackoverflow.com/questions/59097818/extends-express-request-type-in-typescript
declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

declare module 'express' {
  interface Request {
    userId?: string;
  }
}
// TODO ---

// Init Express App
const { app } = (() => {
  const app = express();

  // Logging Middleware
  app.use(logger('dev'));

  // Protects app from some well-known web vulnerabilities
  app.use(helmet());

  // Cors Middleware
  // https://expressjs.com/en/resources/middleware/cors.html
  // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
  app.use(
    cors({
      origin: config.app.corsOrigin, // Access-Control-Allow-Origin
      credentials: true, // Access-Control-Allow-Credentials
    }),
  );

  // Cookie-Parser Middleware
  // The middleware will parse the Cookie header on the request and expose the cookie data as the property req.cookies
  // https://expressjs.com/en/resources/middleware/cookie-parser.html
  app.use(cookieParser());

  // Session Middleware
  // https://github.com/expressjs/session
  const discordSessionConfig = config.session.discord;
  app.use(
    session({
      secret: discordSessionConfig.secret,
      name: discordSessionConfig.name,
      resave: false,
      saveUninitialized: false, // https://stackoverflow.com/questions/40381401/when-to-use-saveuninitialized-and-resave-in-express-session
      cookie: {
        maxAge: discordSessionConfig.maxAge,
      },
    }),
  );

  // Middleware that protects against to many requests
  app.use(rateLimiterMiddleware);

  // Custom deserialize Session Middleware
  app.use(deserializeSession);

  // Middleware to parse incoming requests with JSON payloads
  app.use(
    json({
      limit: '100kb',
      strict: true,
      type: 'application/json',
    }),
  );
  app.use(cryptoJsonMiddleware);

  // Register Routes
  app.use('/', routes);

  // Middleware to catch unregistered routes as 404 errors
  app.use((req, res, next) => {
    next(createHttpError(404)); // Go to next middleware (-> 'Error Handler Middleware' that was registered as last)
  });

  // Error Handler Middleware
  // https://expressjs.com/en/guide/error-handling.html
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err });
  });

  return { app };
})();

export default app;
