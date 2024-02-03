const Queue = require('bull');
const Account = require('lib/models/Account');
const Complaint = require('lib/models/Complaint');
const Issue = require('lib/models/Issue');

const issueQueue = new Queue('issue', process.env.REDIS_URL);

module.exports = async function handleIssue(job) {
  console.log(`Handling issue: ${job.id}`);

  try {
    const complaint = await Complaint.findById(job.id);
    const account = await Account.findById(complaint.account);

    // Get all account's issues
    const issues = Issue.find({
      status: 'open',
      account: account.id,
    });

    // Call openAI, categorize complaint into issue OR create new
    const issue = '';

    // Update issue for complaint
    complaint.findByIdAndUpdate(job.id, { issue });

    // Update complaint count and add issue update to queue
    const i = await issue.findByIdAndUpdate(issue, { $inc: { complaints: 1 } });
    await issueQueue.add(i.toJSON(), {
      removeOnComplete: true,
      removeOnFail: true,
      jobId: this.id,
    });
  } catch (err) {
    console.log(err);
  }
};
