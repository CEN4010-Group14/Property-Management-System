const Property = require("../models/property")
const {validationResult} = require('express-validator')

// Creates a New Property - CURRENTLY WORKING
exports.newProperty = (req, res) => {
    const errors = validationResult(req)
  
    if(!errors.isEmpty()) {
      console.log(errors.array()[0].msg)
    }
  
    const property = new Property({
      ownerId: req.app.locals.user.id,
      dateOfPurchase: req.body.dateOfPurchase,
      price: req.body.price,
      address: req.body.address,
      zipCode: req.body.zipCode
    })
    property.save((err) => {
      if(err) {
        console.log(err);
        console.log("Unable to add property")
      } else {
        console.log("Added Property Successfully")
        console.log(property)
      }
    })
  }

  // Edit a Property - UNKNOWN IF WORKING
exports.editProperty = (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      console.log(errors.array()[0].msg)
    }

    let address = req.body.address;

    Property.findOne({address}, (err, property) => {
      if(err || !property) {
        return res.render('dashboard', {
          error: "Error editing address"
        })
      } else {
        Property.save({
          _id: property.id,
          dateOfPurchase: req.body.dateOfPurchase,
          price: req.body.price,
          address: req.body.address,
          zipCode: req.body.zipCode
        })
      }
    })
}

// Deletes a Property - NOT WORKING
exports.deleteProperty = (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    console.log(errors.array()[0].msg)
  }

  Property.save({
    ownerId: req.app.locals.user.id,
    dateOfPurchase: req.body.dateOfPurchase,
    price: req.body.price,
    address: req.body.address,
    zipCode: req.body.zipCode
  })
}
  