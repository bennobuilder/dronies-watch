import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import createHttpError from 'http-errors';

// Routes
import routes from './routes';

// Init Express App
const app = express();

app.use(logger('dev'));
app.use(cors());

// Register Routes
app.use('/', routes);

// Catch 404 and forward to Error Handler
app.use((req, res, next) => {
  next(createHttpError(404));
});

// Error Handler
// https://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

export default app;
