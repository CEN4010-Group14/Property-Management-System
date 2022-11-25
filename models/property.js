const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
  dateOfPurchase: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true,
    maxlength: 10
  },
  address: {
    type: String,
    required: true,
    maxlength: 50
  },
  zipCode: {
    type: Number,
    required: true,
    maxlength: 10
  },
}, {timestamps: true})

module.exports = mongoose.model("Property", propertySchema)