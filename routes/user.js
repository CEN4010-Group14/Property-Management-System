const express = require("express")
const { signup, signin, signout } = require("../controllers/user")
const { requireAuth, checkUser } = require('../middleware/auth');
const {check} = require('express-validator')
const router = express.Router()
const Property = require("../models/property")

router.get('*', checkUser);

router.get('/signup', (req, res) => {
  return res.render('signup');
});

router.post('/signup', [
  check("firstName", "First name should be at least 3 characters").isLength({min: 3}),
  check("firstName", "First name should be less than 32 characters").isLength({max: 32}),
  check("lastName", "Last name should be at least 3 characters").isLength({min: 3}),
  check("lastName", "Last name should be less than 3 characters").isLength({max: 32}),
  check("email", "Email should be valid").isEmail(),
  check("password", "Password should be at least 6 characters").isLength({min: 6}),
] ,signup)

router.get('/', (req, res) => {
  return res.render('signin');
});

router.post('/', signin)

router.get('/forgot-password', (req, res) => {
  return res.render('forgot-password');
});

router.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard', {
      firstName: res.locals.user.firstName,
      lastName: res.locals.user.lastName
    })
});

router.get('/profile', requireAuth, (req, res) => {
  res.render('profile', {
    firstName: res.locals.user.firstName,
    lastName: res.locals.user.lastName
  })
});

router.get("/signout", signout)

module.exports = router