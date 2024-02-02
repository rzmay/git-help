const express = require('express');
const accounts = require('../controllers/account');
const users = require('../controllers/user');
const complaints = require('../controllers/complaint');
const issues = require('../controllers/issue');
const auth = require('../middlewares/auth');

const router = express.Router();

// Accounts
router.get('/accounts/:id', auth(), accounts.retrieveAccount);
router.patch('/accounts/:id', auth(true), accounts.updateAccount);
router.delete('/accounts/:id', auth(true), accounts.deleteAccount);
router.get('/accounts', auth(true), accounts.listAccounts);

// Complaints
router.post('/complaints', auth(), complaints.createComplaint);
router.get('/complaints/:id', auth(), complaints.retrieveComplaint);
router.patch('/complaints/:id', auth(), complaints.updateComplaint);
router.delete('/complaints/:id', auth(), complaints.deleteComplaint);
router.get('/complaints', auth(), complaints.listComplaints);

// Issues
router.post('/issues', auth(), issues.createIssue);
router.get('/issues/:id', auth(), issues.retrieveIssue);
router.patch('/issues/:id', auth(), issues.updateIssue);
router.delete('/issues/:id', auth(), issues.deleteIssue);
router.get('/issues', auth(), issues.listIssues);

// Users
router.get('/users/:id', auth('user_retrieve', true), users.retrieveUser);
router.patch('/users/:id', auth('user_update', true), users.updateUser);
router.get('/users', auth('user_list', true), users.listUsers);

module.exports = router;
