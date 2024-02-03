const Queue = require('bull');
const dayjs = require('lib/dayjs');
const { nanoid } = require('nanoid');
const mongoose = require('../mongoose');
const { updateIssue } = require('../services/github.service');
const Account = require('./Account');
const Complaint = require('./Complaint');

const issueQueue = new Queue('issue', process.env.REDIS_URL);

const issueSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  created: {
    type: Date,
    default: Date.now,
    immutable: true,
    get: (v) => v?.getTime(),
  },
  account: {
    type: String,
    ref: 'Account',
    required: true,
    immutable: true,
    validate: (v) => Account.exists({ _id: v }),
  },
  number: {
    type: Number,
    default: null,
  },
  status: {
    type: String,
    enum: ['processing', 'open', 'closed', 'completed'],
    default: 'processing',
  },
  complaints: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  labels: {
    urgency: {
      type: String,
      enum: ['low', 'medium', 'critical'],
    },
    type: {
      type: String,
      enum: ['bug', 'feature', 'improvement'],
    },
    estimated_implementation_time: {
      type: String,
      enum: ['hours', 'days', 'weeks', 'months'],
    },
    impact: {
      type: String,
      enum: ['minimal', 'medium', 'wide'],
    },
  },
});

// After an issue is created
issueSchema.post('save', async function () {
  // Add to the issues queue
  await issueQueue.add(this.toJSON(), {
    removeOnComplete: true,
    removeOnFail: true,
    jobId: this.id,
  });
});

// After an issue is updated
issueSchema.post('findOneAndUpdate', async (issue) => {
  const update = this.getUpdate()?.$set || this.getUpdate();

  // Return if this is the first update
  if (update.number) return;

  // We'll make a call to GitHub here in order to add the issue to the repository
  if (issue.status !== 'open') return;

  const account = await Account.findById(issue.account);

  return updateIssue(
    issue.number,
    issue.getGithubPayload(),
    account.settings.github_owner,
    account.settings.github_repository,
    account.settings.github_token,
  );
});

issueSchema.methods.getMarkdown = async function () {
  const recentComplaints = await Complaint
    .find({ account: this.account, issue: this.issue })
    .sort({ created: -1 })
    .limit(5);

  return `
  ${this.description}

  ---
  **${this.complaints} Complaints**

  ${recentComplaints.map((c) => `
    ${dayjs(c.created).format('LLL')}${c.user ? ` (${c.user})` : ''}
    > ${c.body}
    ${c.page ? `*On ${c.page}*` : ''}
  `).join('')}

  *See all complaints on your [GitHelp dashboard](${process.env.DASHBOARD_BASE_URL}/issue/${this.id})
  ---
  Powered by GitHelp
  `;
};

issueSchema.methods.getLabels = function () {
  return [
    `${this.labels.urgency.capitalize()} Urgency`,
    `${this.labels.type.capitalize()}`,
    `${this.labels.impact.capitalize()}, Impact`,
    `Implement in ${this.labels.estimated_implementation_time}`,
  ];
};

issueSchema.methods.getGitHubPayload = async function () {
  // Placeholder -- we'll generate actual payload later
  const account = await Account.findById(this.account);

  return {
    owner: account.settings.github_owner,
    repo: account.settings.github_repository,
    title: this.title,
    body: await this.getMarkdown(),
    labels: this.getLabels(),
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  };
};

module.exports = mongoose.models.Issue || mongoose.model('Issue', issueSchema);
