const User = require("../models/user")
const {validationResult} = require('express-validator')
var jwt = require('jsonwebtoken')

// Handles registration of User
exports.signup = (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.render('signup', {
      error: errors.array()[0].msg
    })
  }

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.email.substring(0, req.body.email.lastIndexOf("@")),
    password: req.body.password
  })
  user.save((err, user) => {
    if(err) {
      return res.render('signup', {
        error: "Unable to add user"
      });
    }

    return res.render('signup', {
      error: "Successfully created account!"
    })
  })
}

// Handles Signing in of user
exports.signin = (req, res) => {
  let email = req.body.email;
	let password = req.body.password;

  User.findOne({email}, (err, user) => {
    if(err || !user || !user.authenticate(password)) {
      return res.render('signin', {
        error: "Incorrect password or email not found"
      })
    }

    // Create token
    const token = jwt.sign({_id: user._id}, process.env.SECRET)

    // Put token in cookie
    res.cookie('token', token, {expire: new Date() + 1})

    res.redirect('dashboard')

    // Send response
  /*const {_id, firstName, lastName, email} = user
   return res.json({
    token,
   user: {
   _id,
   firstName,
   lastName,
   email
  }
  })*/
    
  })
}

// Handles Signing out of User
exports.signout = (req, res) => {
  res.clearCookie("token")
  res.redirect('/');
  //return res.json({
  //  message: "User signout successful"
  //})
}
