const Queue = require('bull');
const { nanoid } = require('nanoid');
const mongoose = require('../mongoose');
const Account = require('./Account');

const complaintQueue = new Queue('complaint', process.env.REDIS_URL);

const complaintSchema = new mongoose.Schema({
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
  issue: {
    type: String,
    ref: 'Issue',
    default: null,
    validate: (v) => !v || Account.exists({ _id: v }),
  },
  body: {
    type: String,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
  /* Optional user id */
  user: {
    type: String,
    default: null,
  },
});

// After an complaint is created
complaintSchema.post('save', async () => {
  // Add to the complaints queue
  await complaintQueue.add(this.toJSON(), {
    removeOnComplete: true,
    removeOnFail: true,
    jobId: this.id,
  });
});

module.exports = mongoose.models.Issue || mongoose.model('Issue', complaintSchema);
