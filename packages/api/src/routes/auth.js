const express = require('express');
const status = require('http-status');
const Token = require('lib/models/Token');
const User = require('lib/models/User');
const resend = require('lib/resend');
const user = require('../middlewares/user');

const router = express.Router();

router.post('/login/email', async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) user = await User.create({ email: req.body.email });

    const token = await Token.create({ user: user.id, strategy: 'email' });

    const loginLink = token.getLoginLink(
      req.query.redirect?.toString() || '/dashboard',
    );

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: req.body.email,
      subject: 'Log in to GitHelp',
      html: `
        <div>
          Your login link for GitHelp
          <br /><br />
          <a href="${loginLink}">Continue to GitHelp</a>
          <br /><br />
        </div>
      `,
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.post('/recycle', async (req, res, next) => {
  try {
    const oldToken = await Token.findById(req.body.authorization);
    if (!oldToken) return res.sendStatus(status.UNAUTHORIZED);

    const newToken = await Token.create({
      user: oldToken.user,
      strategy: oldToken.strategy,
    });

    await User.findByIdAndUpdate(oldToken.user, { last_login: Date.now() });
    await oldToken.deleteOne();

    res.send({ authorization: newToken.id });
  } catch (err) {
    next(err);
  }
});

router.get('/user', user(), async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
