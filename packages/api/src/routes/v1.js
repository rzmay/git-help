const express = require('express');
const accounts = require('../controllers/account');
const complaints = require('../controllers/complaint');
const issues = require('../controllers/issue');
const users = require('../controllers/user');
const auth = require('../middlewares/auth');

const router = express.Router();

// Accounts
router.get('/accounts/:id', auth(), accounts.retrieveAccount);
router.patch('/accounts/:id', auth(), accounts.updateAccount);
router.delete('/accounts/:id', auth(), accounts.deleteAccount);
// router.get('/accounts', auth(), accounts.listAccounts);

// Complaints
router.post('/complaints', auth(), complaints.createComplaint);
router.get('/complaints/:id', auth(), complaints.retrieveComplaint);
router.delete('/complaints/:id', auth(), complaints.deleteComplaint);
router.get('/complaints', auth(), complaints.listComplaints);

// Issues
router.post('/issues', auth(), issues.createIssue);
router.get('/issues/:id', auth(), issues.retrieveIssue);
router.patch('/issues/:id', auth(), issues.updateIssue);
router.delete('/issues/:id', auth(), issues.deleteIssue);
router.get('/issues', auth(), issues.listIssues);

// Users
router.get('/users/:id', auth(), users.retrieveUser);
router.patch('/users/:id', auth(), users.updateUser);
// router.get('/users', auth(), users.listUsers);

module.exports = router;
