const Account = require('lib/models/Account');
const Issue = require('lib/models/Issue');
const { createIssue } = require('lib/services/github.service');

module.exports = async function handleIssue(job) {
  console.log(`Handling issue: ${job.id}`);

  try {
    const issue = await Issue.findById(job.id);
    const account = await Account.findById(issue.account);

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
      number: data.number,
    });
  } catch (err) {
    console.log(err);
  }
};
