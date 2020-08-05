const express = require('express');
const { getAllUsers, addUser, getUserById, updateTotal } = require('../controllers/users');
const auth = require('../middleware/auth');

const router = express.Router();
const { check } = require('express-validator');

router.get('/', getAllUsers);

router.post(
  '/', 
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  addUser);

router.get('/:user_id', getUserById);

router.put(
  '/:user_id', [auth], updateTotal);

module.exports = router;