const express = require('express');
const fs = require('fs');
const status = require('http-status');
const Complaint = require('lib/models/Complaint');
const Issue = require('lib/models/Issue');
const embed = require('../middlewares/embed');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { key } = req.query;

    if (!key) return res.sendStatus(status.BAD_REQUEST);

    fs.readFile('../embed/index.js', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the JavaScript file:', err);
        return res.status(500).send('An error occurred');
      }

      // Append the dynamic line to the file contents
      const modifiedData = `${data}\nconst githelp_accountPublicKey = "${key}";\n`;

      // Set the Content-Type to JavaScript
      res.setHeader('Content-Type', 'application/javascript');

      // Send the modified JavaScript content
      res.send(modifiedData);
    });
  } catch (err) {
    next(err);
  }
});

router.get('/css', async (req, res, next) => {
  try {
    res.sendFile('../embed/styles.css');
  } catch (err) {
    next(err);
  }
});

router.get('/issues', embed(), async (req, res, next) => {
  try {
    const issues = await Issue
      .find({ account: res.locals.account.id })
      .sort({ complaints: -1 })
      .limit(5);

    res.send({ data: issues.map((issue) => issue.title) || [] });
  } catch (err) {
    next(err);
  }
});

router.post('/complaint', embed(), async (req, res, next) => {
  try {
    const complaint = await Complaint.create({
      ...req.body,
      ...(res.locals.account.id && { account: res.locals.account.id }),
    });

    res.send(complaint.toJSON());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
