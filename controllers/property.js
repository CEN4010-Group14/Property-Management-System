const Property = require("../models/property")
const {validationResult} = require('express-validator')

// Creates a New Property - WORKING
exports.addProperty = (req, res) => {
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
    property.save((err, property) => {
      if(err) {
        console.log(err);
        console.log("Unable to add property")
      } else {
        console.log("Added Property Successfully")
        console.log(property)
      }
    })
  }

  // Edit a Property - NOT WORKING
exports.editProperty = (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      console.log(errors.array()[0].msg)
    }

    Property.findOne({ ownerId: req.app.locals.user.id, address: req.body.address }, (err, property) => {
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
        console.log("Edited property successfully");
      }
    })
}

// Deletes a Property - WORKING
exports.deleteProperty = (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    console.log(errors.array()[0].msg)
  }

  console.log(req.body.address)

  Property.findOneAndDelete({ ownerId: req.app.locals.user.id, address: req.body.address }, (err, property) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted property successfully");
    }
  })
}
  