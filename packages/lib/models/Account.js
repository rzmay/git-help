const { nanoid } = require('nanoid');
const mongoose = require('../mongoose');
const User = require('./User');

/*
  * The account model represents an individual account or project.
  * This is separate from the User because
  * - multiple users can work on the same project.
  * - users can exist without accounts in order to upload their linkedin profile
  * This is where we store per-project settings like github or slack connection config.
*/
const accountSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  name: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
    immutable: true,
    get: (v) => v?.getTime(),
  },
  owner: {
    type: String,
    immutable: true,
    required: true,
    ref: 'User',
    validate: (v) => User.exists({ _id: v }),
  },
  staff: [{
    type: String,
    immutable: true,
    required: true,
    ref: 'User',
    validate: (v) => User.exists({ _id: v }),
  }],
  settings: {
    github_owner: {
      type: String,
      default: null,
    },
    github_repository: {
      type: String,
      default: null,
    },
    github_token: {
      type: String,
      default: null,
    },
  },
});

accountSchema.index({ 'staff.user': 1 });

module.exports = mongoose.models.Account || mongoose.model('Account', accountSchema);
