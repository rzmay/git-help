const dayjs = require('dayjs');
const Account = require('../models/Account');
const Complaint = require('../models/Complaint');

async function getMarkdown(issue, labels = []) {
  const recentComplaints = await Complaint
    .find({ account: issue.account, issue: issue.id })
    .sort({ created: -1 })
    .limit(5).exec();

  return `
${issue.description}

${labels.map((l) => `* ${l}`).join('\n')}
---
**${issue.complaints} Complaints**

${recentComplaints.map((c) => `
  ${dayjs(c.created).format('LLL')}${c.user ? ` (${c.user})` : ''}
  > ${c.body}
  ${c.page ? `*On ${c.page}*` : ''}
`).join('\n')}

*See all complaints on your [GitHelp dashboard](${process.env.DASHBOARD_BASE_URL}/issue/${issue.id})*
---
Powered by GitHelp
`;
}

async function getGitHubPayload(issue) {
  const account = await Account.findById(issue.account);

  const labels = [
    `${issue.labels.urgency} urgency`,
    `${issue.labels.type}`,
    `${issue.labels.impact} impact`,
    `implement in ${issue.labels.estimated_implementation_time}`,
  ];

  return {
    owner: account.settings.github_owner,
    repo: account.settings.github_repository,
    title: issue.title,
    body: await getMarkdown(issue, labels),
    // labels,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  };
}

module.exports = getGitHubPayload;
