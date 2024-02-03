const status = require('http-status');
const Account = require('lib/models/Account');

// Retrieve an account
module.exports.retrieveAccount = async function retrieveAccount(req, res, next) {
  try {
    const account = await Account.findOne({
      _id: req.params.id,
      ...(res.locals.account && { _id: res.locals.account }),
    });

    if (!account) return res.sendStatus(status.NOT_FOUND);

    res.send(account.toJSON());
  } catch (err) {
    next(err);
  }
};

// Update an account
module.exports.updateAccount = async function updateAccount(req, res, next) {
  try {
    const account = await Account.findOneAndUpdate({
      _id: req.params.id,
    }, req.body, { runValidators: true, new: true });

    if (!account) return res.sendStatus(status.NOT_FOUND);

    res.send(account.toJSON());
  } catch (err) {
    next(err);
  }
};

// Delete an account
module.exports.deleteAccount = async function deleteAccount(req, res, next) {
  try {
    const account = await Account.findById(req.params.id);

    if (!account) return res.sendStatus(status.NOT_FOUND);

    await account.deleteOne();

    res.sendStatus(status.ACCEPTED);
  } catch (err) {
    next(err);
  }
};
