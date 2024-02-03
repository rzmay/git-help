const status = require('http-status');
const Account = require('lib/models/Account');
const Token = require('lib/models/Token');
const User = require('lib/models/User');

require('lib/models/User');

module.exports = function auth() {
  return async function (req, res, next) {
    if (!req.cookies.authorization) res.sendStatus(status.UNAUTHORIZED);

    // Fetch relevant token
    const token = await Token.findById(req.cookies.authorization);

    // Reject if authorization token not found
    if (!token) return res.sendStatus(status.UNAUTHORIZED);

    const user = await User.findById(token.user);
    const account = await Account.findOne({
      _id: req.get('Hyper-Account'),
      staff: user.id,
    });

    // Reject if no user & account
    if (!account || !user) return res.sendStatus(status.UNAUTHORIZED);

    // Set locals
    req.user = user;
    res.locals.account = account;

    next();
  };
};
