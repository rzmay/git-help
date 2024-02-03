const express = require('express');
const Account = require('lib/models/Account');
const auth = require('../../middlewares/auth');
const user = require('../../middlewares/user');

const router = express.Router();

router.post('/account', user(), async (req, res, next) => {
  try {
    const account = await Account.create({
      ...req.body,
      owner: req.user,
      staff: [req.user],
    });

    res.send(account);
  } catch (err) {
    next(err);
  }
});

router.get('/account/github', auth(), async (req, res, next) => {
  try {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&state=${res.locals.account.id}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
