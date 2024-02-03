const Account = require('lib/models/Account');
const Complaint = require('lib/models/Complaint');
const Issue = require('lib/models/Issue');

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

    // Call openAI, categorize complaint into issue or create new
    const issue = '';

    // Update issue for complaint
    complaint.findByIdAndUpdate(job.id, { issue });

    // Update complaint by for issue
    issue.findByIdAndUpdate(issue, { $inc: { complaints: 1 } });
  } catch (err) {
    console.log(err);
  }
};
