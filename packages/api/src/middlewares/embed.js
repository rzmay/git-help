const status = require('http-status');
const Account = require('lib/models/Account');

require('lib/models/User');

module.exports = function auth() {
  return async function (req, res, next) {
    const bearerToken = /^ *[Bb][Ee][Aa][Rr][Ee][Rr] +([A-Za-z0-9_-]+) *$/.test(req.get('Authorization')) ? req.get('Authorization').split(' ')[1] : undefined;

    if (bearerToken) {
      // Fetch relevant account
      const account = await Account.findOne({ public_key: bearerToken });

      // Reject if authorization token not found
      if (!account) return res.sendStatus(status.UNAUTHORIZED);

      // Set locals
      res.locals.account = account;

      next();
    }
  };
};
