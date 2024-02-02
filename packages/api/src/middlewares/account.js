module.exports = function account() {
  return async function (req, res, next) {
    res.locals.account = req.get('Hyper-Account');
    next();
  };
};
