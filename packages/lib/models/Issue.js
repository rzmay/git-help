// const Queue = require('bull');
// const dayjs = require('lib/dayjs');
const { nanoid } = require('nanoid');
const getGitHubPayload = require('../helpers/getGithubPayload');
const mongoose = require('../mongoose');
const { updateIssue } = require('../services/github.service');
const Account = require('./Account');
// const Complaint = require('./Complaint');

// const issueQueue = new Queue('issue', process.env.REDIS_URL);

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
// issueSchema.post('save', async function () {
//   // Add to the issues queue
//   await issueQueue.add(this.toJSON(), {
//     removeOnComplete: true,
//     removeOnFail: true,
//     jobId: this.id,
//   });
// });

// After an issue is updated
issueSchema.post('findOneAndUpdate', async (issue) => {
  if (!issue) return;

  // We'll make a call to GitHub here in order to add the issue to the repository
  if (issue.status !== 'open') return;

  const account = await Account.findById(issue.account);

  await updateIssue(
    issue.number,
    await getGitHubPayload(issue),
    account.settings.github_owner,
    account.settings.github_repository,
    account.settings.github_token,
  );
});

module.exports = mongoose.models.Issue || mongoose.model('Issue', issueSchema);
