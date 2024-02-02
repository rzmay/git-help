const { nanoid } = require('nanoid');
const mongoose = require('../lib/mongoose');
const Account = require('./Account');

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
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  tags: {
    urgency: {
      type: String,
      enum: ['low', 'medium', 'critical'],
    },
    type: {
      type: String,
      enum: ['bug', 'feature', 'improvement']
    },
    estimated_implementation_time: {
      type: String,
      enum: ['day', 'week', '2 weeks', 'month']
    },
    impact: {
      type: String,
      enum: ['minimal', 'medium', 'wide']
    }
  }
});

// After an issue is created
issueSchema.post('save', async function() {
  // We'll make a call to GitHub here in order to add the issue to the repository
});

// After an issue is updated
issueSchema.post('findOneAndUpdate', async function(issue) {
  // We'll make a call to GitHub here in order to add the issue to the repository
});

module.exports = mongoose.models.Issue || mongoose.model('Issue', issueSchema);
