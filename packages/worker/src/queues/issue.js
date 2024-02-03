const Account = require('lib/models/Account');
const Complaint = require('lib/models/Complaint');
const Issue = require('lib/models/Issue');
const { createIssue } = require('lib/services/github.service');

module.exports = async function handleIssue(job) {
  console.log(`Handling issue: ${job.id}`);

  try {
    const issue = await Issue.findById(job.id);
    const account = await Account.findById(issue?.account);

    if (!issue) throw new Error('Issue not found');

    // Get complaints
    const complaints = await Complaint.find({ account: account.id, issue: job.id }).select('page body');

    // Call openAI, updating fields

    // Call github, creating issue
    const data = await createIssue(
      issue.getGitHubPayload(),
      account.settings.github_owner,
      account.settings.github_repository,
      account.settings.github_token,
    );

    // Update issue number
    issue.findByIdAndUpdate(job.id, {
      status: 'open',
      number: data.number,
    });
  } catch (err) {
    console.log(err);
  }
};
