const Account = require('lib/models/Account');
const Complaint = require('lib/models/Complaint');
const Issue = require('lib/models/Issue');

/* Subscription handler to update issues from their backlog of complaints on a recurring basis. */
module.exports = async function issueBacklog(message) {
  console.log('Handling issue backlog');
  message.ack();

  try {
    // Get all complaints from the last hour, grouped by account

    // Loop through accounts, update issues from complaints
  } catch (err) {
    if (process.env.DEBUG) console.log(err);
  }
};
