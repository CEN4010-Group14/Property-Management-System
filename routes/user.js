const express = require("express")
const { signup, signin, signout } = require("../controllers/user")
const {check} = require('express-validator')
const router = express.Router()
const User = require("../models/user")

router.get('/signup', (req, res) => {
  return res.render('signup');
});

router.post('/signup', [
  check("name", "Name at least should be 3 characters").isLength({min: 3}),
  check("email", "Email should be valid").isEmail(),
  check("password", "Password at least should be 6 characters").isLength({min: 6}),
] ,signup)

router.get('/', (req, res) => {
  return res.render('signin');
});

router.post('/', signin)

router.get('/forgot-password', (req, res) => {
  return res.render('forgot-password');
});

router.get('/dashboard', (req, res) => {
  User.find({}, function(err, data) {
    res.render('dashboard', {
      name: req.name
    })
  })
});

router.get('/profile', (req, res) => {
  return res.render('profile');
});

router.get("/signout", signout)

module.exports = router