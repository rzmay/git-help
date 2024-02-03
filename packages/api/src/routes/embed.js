const express = require('express');
const Complaint = require('lib/models/Complaint');
const Issue = require('lib/models/Issue');
const embed = require('../middlewares/embed');

const router = express.Router();

router.get('/embed/issues', embed(), async (req, res, next) => {
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

router.post('/embed/complaint', embed(), async (req, res, next) => {
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
