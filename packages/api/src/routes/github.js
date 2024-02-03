const express = require('express');
const status = require('http-status');
const Account = require('lib/models/Account');

const router = express.Router();

router.post('/webhook', async (req, res, next) => {
  try {
    const { code, repository, owner, state } = req.query;

    if (!code) return res.sendStatus(status.BAD_REQUEST);

    // Exchange the code for an access token using fetch
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const { access_token: accessToken } = await response.json();

    // Ladies and gentlemen, we got em
    await Account.findByIdAndUpdate(state, {
      'settings.github_token': accessToken,
      'settings.github_repository': repository,
      'settings.github_owner': owner,
    });

    res.redirect(`${process.env.DASHBOARD_BASE_URL}/`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
