const status = require('http-status');
const Token = require('lib/models/Token');

require('lib/models/User');

module.exports = function auth() {
  return async function (req, res, next) {
    if (req.cookies.authorization) {
      // Fetch relevant token
      const token = await Token.findById(req.cookies.authorization).populate('user');

      // Reject if authorization token not found
      if (!token) return res.sendStatus(status.UNAUTHORIZED);

      // Set locals
      res.locals.user = token.user;

      next();
    }
  };
};
