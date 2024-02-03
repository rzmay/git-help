const Token = require('lib/models/Token');
const User = require('lib/models/User');

module.exports = function user() {
  return async function (req, res, next) {
    if (req.cookies.authorization) {
      const token = await Token.findById(req.cookies.authorization);
      if (!token) return next();

      req.user = await User.findById(token.user)
        .populate({ path: 'accounts' });
    }

    next();
  };
};
