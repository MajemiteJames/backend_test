const express = require("express");
const faker = require("faker");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User1 = require("../../Models/User");

// @route POST api/users
// @desc Create user 50,000
// @access Public

router.post("/", async (req, res) => {
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  let email = faker.internet.email();
  let wallet = faker.finance.amount(9000, 10000, 4);

  try {
    for (let id = 1; id <= 50000; id++) {
      user = new User1({
        id: id,
        firstName,
        lastName,
        email,
        wallet,
      });

      await user.save();
    }

    res.status(201).send({
      status: 201,
      msg: "users created successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/users
// @desc Create single user
// @access Public

router.post(
  "/single",
  [
    [
      check("firstName", "First name is required").not().isEmpty(),
      check("lastName", "Last name is required").not().isEmpty(),
      check("email", "A valid email is required").isEmail(),
      check("wallet", "Wallet amount is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }

    const { firstName, lastName, email, wallet } = req.body;

    try {
      let user = await User1.findOne({ email });
      if (user) {
        return res
          .status(404)
          .json({ status: 404, errors: [{ msg: "User already exist" }] });
      }
      user = new User({
        firstName,
        lastName,
        email,
        wallet,
      });
      await user.save();

      res.status(201).send({
        status: 201,
        msg: "users created successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route PATCH api/users
// @desc CREDIT a user
// @access Public

router.patch("/credit/:id", async (req, res) => {
  //   let _id = req.params._id;
  //   const { credit } = req.body;
  //   console.log(wallet);
  try {
    const user = await User1.findById(req.params.id).select("-password");
    console.log(user);
    let oldBalance = user.wallet;
    let credit = faker.finance.amount(6000, 10000, 4);
    let newBalance = parseFloat(oldBalance) + parseFloat(credit);
    console.log(newBalance.toFixed(1));
    user.wallet = newBalance;
    await user.save();
    return res
      .status(200)
      .json({ status: 200, message: "User credited successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route PATCH api/users
// @desc Debit a user
// @access Public

router.patch("/debit/:id", async (req, res) => {
  try {
    const user = await User1.findById(req.params.id).select("-password");
    console.log(user);
    let oldBalance = user.wallet;
    let credit = faker.finance.amount(6000, 10000, 4);
    let newBalance = parseFloat(oldBalance) - parseFloat(credit);
    console.log(newBalance.toFixed(1));
    user.wallet = newBalance;
    await user.save();
    return res
      .status(200)
      .json({ status: 200, message: "User credited successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
