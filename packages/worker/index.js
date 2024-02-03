const Queue = require('bull');
const mongoose = require('lib/mongoose');
// const pubsub = require('lib/pubsub');
const redis = require('lib/redis');
const throng = require('throng');
const issueHandler = require('./src/queues/issue');
// const issueBacklogHandler = require('./src/subscriptions/issueBacklog');

async function start() {
  // Connect to database
  await mongoose.connect(process.env.DATABASE_URL);

  // Connect to Redis
  await redis.connect();

  // Connect to named work queues
  const issueQueue = new Queue('issue', process.env.REDIS_URL);

  // Connect to GCS subscriptions
  // const issueBacklogSub = pubsub('issue-backlog');

  // Attach work handlers to queues
  issueQueue.process(50, issueHandler);

  // Attach work handlers to subscriptions
  // issueBacklogSub.on('message', issueBacklogHandler);
}

throng({
  worker: start,
  count: process.env.WORKER_CONCURRENCY || 1,
  lifetime: Infinity,
});
