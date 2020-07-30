const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
}

// @route    POST api/v1/users
// @desc     Register user
exports.addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User with that email already exists' }] });
    }

    user = new User({
      name,
      email,
      password,
      totalMoney: 0,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).select('-password');;

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc Edit user total amount
// @route PUT /api/v1/users/:user_id
exports.updateTotal = async (req, res) => {

  try {
    const user = await User.findById(req.params.user_id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.totalMoney = req.body.amount;

    await user.save();
    res.send(`User ${user.name} money changed`);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
