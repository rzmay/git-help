const status = require('http-status');
const Issue = require('lib/models/Issue');

// Create a issue
module.exports.createIssue = async function createIssue(req, res, next) {
  try {
    const issue = await Issue.create({
      ...req.body,
      ...(res.locals.account && { account: res.locals.account.id }),
    });

    res.send(issue.toJSON());
  } catch (err) {
    next(err);
  }
};

// Retrieve a issue
module.exports.retrieveIssue = async function retrieveIssue(req, res, next) {
  try {
    const issue = await Issue.findOne({
      _id: req.params.id,
      ...(res.locals.account && { account: res.locals.account.id }),
      expand: req.query.expand,
    });

    if (!issue) return res.sendStatus(status.NOT_FOUND);

    res.send(issue.toJSON());
  } catch (err) {
    next(err);
  }
};

// Update a issue
module.exports.updateIssue = async function updateIssue(req, res, next) {
  try {
    const issue = await Issue.findOneAndUpdate({
      _id: req.params.id,
      ...(res.locals.account && { account: res.locals.account.id }),
    }, req.body, { runValidators: true, new: true });

    if (!issue) return res.sendStatus(status.NOT_FOUND);

    res.send(issue.toJSON());
  } catch (err) {
    next(err);
  }
};

// Delete a issue
module.exports.deleteIssue = async function deleteIssue(req, res, next) {
  try {
    const issue = await Issue.findOne({
      _id: req.params.id,
      ...(res.locals.account && { account: res.locals.account.id }),
    });

    if (!issue) return res.sendStatus(status.NOT_FOUND);

    await issue.deleteOne();

    res.sendStatus(status.ACCEPTED);
  } catch (err) {
    next(err);
  }
};

// List issues
module.exports.listIssues = async function listIssues(req, res, next) {
  try {
    const issues = await Issue.paginate({
      ...req.query,
      ...(res.locals.account && { account: res.locals.account.id }),
    });

    res.send(issues);
  } catch (err) {
    console.log(err)
    next(err);
  }
};
