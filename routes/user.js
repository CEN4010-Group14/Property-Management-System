const express = require("express")
const { signup, signin, signout } = require("../controllers/user")
const { newProperty } = require("../controllers/property")
const { requireAuth, checkUser } = require('../middleware/auth');
const {check} = require('express-validator')
const Property = require("../models/property")
const router = express.Router()

router.get('/*', checkUser);

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

router.get('/dashboard', async (req, res) => {
    try{
        const properties = await Property.find({})
        res.render('dashboard', {
          properties: properties,
          firstName: res.app.locals.user.firstName,
          lastName: res.app.locals.user.lastName,
          id: res.app.locals.user.id
        })
    } catch(error) {
      console.log(error)
        res.redirect('/')
    }
});

router.get('/profile', requireAuth, (req, res) => {
  res.render('profile', {
    firstName: res.app.locals.user.firstName,
    lastName: res.app.locals.user.lastName,
    username: res.app.locals.user.username,
    email: res.app.locals.user.email
  })
});

router.post('/dashboard', checkUser, [
  check("dateOfPurchase", "Date cannot be empty").isDate(),
  check("price", "Price cannot be more than 10 digits").isLength({max: 10}),
  check("price", "Price cannot be empty").isLength({min: 1}),
  check("price", "Price can only be a number").isInt(),
  check("address", "Address cannot be more than 50 characters").isLength({max: 50}),
  check("address", "Address cannot be empty").isLength({min: 1}),
  check("zipCode", "Zip Code cannot be more than 10 digits").isLength({max: 8}),
  check("zipCode", "Zip Code cannot be empty").isLength({min: 1})
], newProperty)

router.get("/signout", signout)

module.exports = router