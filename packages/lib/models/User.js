const mongoose = require('../mongoose');
const { nanoid } = require('nanoid');

/*
  * The user model is responsible for individual user information.
  * At the moment it stores only the bare minimum.
*/
const userSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  linkedin: { // Temporary. We will likely need to replace this with more linkedin info or a link to their profile.
    type: String,
    lowercase: true
  }
});

userSchema.index({ email: 1 }, { unique: true });

userSchema.virtual('accounts', {
  ref: 'Account',
  localField: '_id',
  foreignField: 'staff',
  justOne: false,
  get: (v) => {
    try {
      return v ? v.map((a) => ({
        name: a.name,
        id: a._id,
      })) : undefined;
    } catch (err) {
      return [];
    }
  },
});

userSchema.methods.generateToken = async function generateToken() {
  // Delete previous tokens to invalidate
  await mongoose.models.Token.deleteMany({ user: this.id });

  // Create a new token and return
  return mongoose.models.Token.create({ user: this.id });
}

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
