//bring in express and define router
const express = require('express');
const router = express.Router();

//route already defined in server.js so the full path isn't required here
//serve json response

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

module.exports = router;
