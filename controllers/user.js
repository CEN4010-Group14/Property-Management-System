const User = require("../models/user")
const {validationResult} = require('express-validator')
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')


exports.signup = (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.render('signup', {
      error: errors.array()[0].msg
    })
  }

  const user = new User(req.body)
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

exports.signout = (req, res) => {
  res.clearCookie("token")
  res.redirect('/');
  //return res.json({
  //  message: "User signout successful"
  //})
}
