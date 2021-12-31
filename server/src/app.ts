import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import createHttpError from 'http-errors';
import flappyDronieRoutes from './routes/flappy-dronie';
import rootRoutes from './routes/root';

const app = express();

app.use(logger('dev'));
app.use(cors());

// Routes
app.use('/', rootRoutes);
app.use('/flappy-dronie', flappyDronieRoutes);

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
