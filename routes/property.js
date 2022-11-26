const express = require("express")
const { newProperty } = require("../controllers/property")
const { requireAuth, checkUser } = require('../middleware/auth');
const {check} = require('express-validator')
const router = express.Router()
const Property = require("../models/property")

router.get('/add', (req, res) => {
  res.render('dashboard', {
    firstName: res.locals.user.firstName,
    lastName: res.locals.user.lastName,
    id: req.locals.user.id
  })
});

router.post('/add', [
  check("dateOfPurchase", "Date cannot be empty").isDate(),
  check("price", "Price cannot be more than 10 digits").isLength({max: 10}),
  check("price", "Price cannot be empty").isLength({min: 1}),
  check("price", "Price can only be a number").isInt(),
  check("address", "Address cannot be more than 50 characters").isLength({max: 50}),
  check("address", "Address cannot be empty").isLength({min: 1}),
  check("zipCode", "Zip Code can only be a number").isInt(),
  check("zipCode", "Zip Code cannot be more than 10 digits").isLength({max: 8}),
  check("zipCode", "Zip Code cannot be empty").isLength({min: 1})
], newProperty)

module.exports = router
