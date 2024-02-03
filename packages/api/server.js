const express = require('express');
const mongoose = require('lib/mongoose');
const redis = require('lib/redis');
const morgan = require('morgan');
const throng = require('throng');
const errorHandler = require('./src/middlewares/errorHandler');

const port = parseInt(process.env.PORT, 10) || 7000;
const dev = process.env.NODE_ENV !== 'production';

async function start() {
  const app = express();

  if (dev) app.use(morgan('dev'));

  // Connect to MongoDB
  await mongoose.connect(process.env.DATABASE_URL);

  // Connect to Redis
  await redis.connect();

  app.set('trust proxy', !dev);
  app.disable('x-powered-by');

  // Set up routers
  app.use('/auth', require('./src/routes/auth'));
  app.use('/auth', require('./src/routes/embed'));
  app.use('/dashboard', require('./src/routes/dashboard'));
  app.use('/healthcheck', require('./src/routes/health'));
  app.use('/', require('./src/routes/index'));

  app.use(errorHandler);

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Listening on ${port}`);
  });
}

throng({
  worker: start,
  count: process.env.WEB_CONCURRENCY || 1,
  lifetime: Infinity,
});