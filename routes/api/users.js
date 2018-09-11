//bring in express and define router
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//load user model
const User = require('../../models/User');

//route already defined in server.js so the full path isn't required here
//serve json response

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   Post api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }) //check that a user doesn't already exists
    .then(user => {
      if (user) {
        //if user is already in system, return 400
        return res.status(400).json({ email: 'Email already exists' });
      } else {
        //default avater or set it to users gravatar
        const avatar = gravatar.url(req.body.email, {
          s: '200', //size
          r: 'pg', //rating
          d: 'mm' //default avatar
        });

        //create new user
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        //encrypt the email
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
});

// @route   GET api/users/login
// @desc    Login User / Returns JWT token
// @access  Public
router.post('/login', (req, res) => {
  const { isValid, errors } = validateLoginInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user by email in database
  User.findOne({ email })
    .then(user => {
      //if not found, 404 with error
      if (!user) {
        errors.email = 'user email not found';
        return res.status(404).json(errors);
      }
      //check password if user is found
      //pass in password and database hashed password
      bcrypt.compare(password, user.password).then(isMatch => {
        //password matches, generate JWT token
        if (isMatch) {
          //create jwt  payload
          const payload = { id: user.id, name: user.name, avatar: user.avatar };

          //sign the token
          jwt.sign(
            payload, //payload
            keys.secretOrKey, //keys from config.keys
            { expiresIn: '360000' }, //expires in
            (err, token) => {
              //callback
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          );
        } else {
          errors.password = 'Password is incorrect';
          return res.status(400).json(password);
        }
      });
    })
    .catch(err => console.log(err));
});

// @route   GET api/users/current
// @desc    return current user
// @access  Private

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      email: req.user.email,
      name: req.user.name,
      id: req.user.id
    });
  }
);

module.exports = router;
