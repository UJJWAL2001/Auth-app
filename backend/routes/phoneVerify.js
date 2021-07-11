const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const phoneVerify = require('../controllers/phoneVerify');


// Login Endpoint
router.route('/register/:phoneNumber')
      .get( phoneVerify.sendOTP )

// Verify Endpoint
router.route('/verify/:phoneNumber/:code')
      .get( phoneVerify.checkOTP )

module.exports = router;