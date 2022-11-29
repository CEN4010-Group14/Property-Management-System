const Property = require("../models/property")
const {validationResult} = require('express-validator')

// Creates a New Property - WORKING
exports.addProperty = (req, res) => {
    const errors = validationResult(req)
  
    if(!errors.isEmpty()) {
      console.log(errors.array()[0].msg)
    }
  
    const property = new Property({
      ownerId: res.app.locals.user.id,
      dateOfPurchase: req.query.dateOfPurchase,
      price: req.query.price,
      address: req.query.address,
      zipCode: req.query.zipCode
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

  // Edit a Property - WORKING
exports.editProperty = (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      console.log(errors.array()[0].msg)
    }

    Property.findOneAndUpdate({ _id: req.params.propertyId }, {
      dateOfPurchase: new Date(req.query.dateOfPurchase),
      price: req.query.price,
      address: req.query.address,
      zipCode: req.query.zipCode
    }, (err, property) => {
      if(err) {
        console.log(err);
      } else {
        console.log("Updated property successfully");
      }
    })
}

// Deletes a Property - WORKING
exports.deleteProperty = (req, res) => {
  const errors = validationResult(req)

  console.log(req.params.propertyId)

  if(!errors.isEmpty()) {
    console.log(errors.array()[0].msg)
  }

  Property.findOneAndDelete({ _id: req.params.propertyId }, (err, property) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted property successfully");
    }
  })
}
  