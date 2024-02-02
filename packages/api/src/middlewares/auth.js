const basicAuth = require('basic-auth');
const status = require('http-status');
const permissions = require('shared/helpers/permissions');
const Account = require('shared/models/Account');
const ApiKey = require('shared/models/ApiKey');
const Token = require('shared/models/Token');
const User = require('shared/models/User');

module.exports = function auth(restricted = false) {
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
