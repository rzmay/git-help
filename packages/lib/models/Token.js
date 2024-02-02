const { nanoid } = require('nanoid');
const mongoose = require('../mongoose');
const User = require('./User');

/*
  * The token model just represents a login token used for auth
*/
const tokenSchema = new mongoose.Schema({
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
  user: {
    type: String,
    immutable: true,
    required: true,
    ref: 'User',
    validate: (v) => User.exists({ _id: v }),
  },
});

tokenSchema.index({ created: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });

module.exports = mongoose.models.Token || mongoose.model('Token', tokenSchema);
