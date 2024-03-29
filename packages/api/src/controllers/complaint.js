const status = require('http-status');
const Complaint = require('lib/models/Complaint');

// Create a complaint
module.exports.createComplaint = async function createComplaint(req, res, next) {
  try {
    const complaint = await Complaint.create({
      ...req.body,
      ...(res.locals.account && { account: res.locals.account.id }),
    });

    res.send(complaint.toJSON());
  } catch (err) {
    next(err);
  }
};

// Retrieve a complaint
module.exports.retrieveComplaint = async function retrieveComplaint(req, res, next) {
  try {
    const complaint = await Complaint.findOne({
      _id: req.params.id,
      ...(res.locals.account && { account: res.locals.account.id }),
      expand: req.query.expand,
    });

    if (!complaint) return res.sendStatus(status.NOT_FOUND);

    res.send(complaint.toJSON());
  } catch (err) {
    next(err);
  }
};

// Delete a complaint
module.exports.deleteComplaint = async function deleteComplaint(req, res, next) {
  try {
    const complaint = await Complaint.findOne({
      _id: req.params.id,
      ...(res.locals.account && { account: res.locals.account.id }),
    });

    if (!complaint) return res.sendStatus(status.NOT_FOUND);

    await complaint.deleteOne();

    res.sendStatus(status.ACCEPTED);
  } catch (err) {
    next(err);
  }
};

// List complaints
module.exports.listComplaints = async function listComplaints(req, res, next) {
  try {
    const complaints = await Complaint.paginate({
      ...req.query,
      ...(res.locals.account && { account: res.locals.account.id }),
    });

    res.send(complaints);
  } catch (err) {
    next(err);
  }
};
