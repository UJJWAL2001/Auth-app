const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync')

router.route('/register')
      .post(catchAsync(user.registerUser));

router.route('/login')
      .post(passport.authenticate('local',{  failureRedirect:'/login' }), catchAsync(user.loginUser));

router.route('/logout')
      .get(user.logout)


module.exports = router;