const Property = require("../models/property")
const {validationResult} = require('express-validator')

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

exports.editProperty = (req, res) => {
    const errors = validationResult(req)
  
    if(!errors.isEmpty()) {
      console.log(errors.array()[0].msg)
    }
  
    Property.save({
      _id: req.app.locals.property.id,
      dateOfPurchase: req.body.dateOfPurchase,
      price: req.body.price,
      address: req.body.address,
      zipCode: req.body.zipCode
    })
}

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
  