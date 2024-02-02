/* Subscription handler to update issues from their backlog of complaints on a recurring basis. */
module.exports = async function issueBacklog(message) {
  console.log('Handling issue backlog');
  message.ack();

  try {
    // Update issues from backlog here
  } catch (err) {
    if (process.env.DEBUG) console.log(err);
    Sentry.captureException(err);
  }
};
