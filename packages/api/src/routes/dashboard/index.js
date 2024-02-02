const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const user = require('../../middlewares/user');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(helmet());
router.use(cors());
router.use(cookieParser());
router.use(user());

router.use('/', require('./account'));

module.exports = router;
