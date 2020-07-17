const express = require("express");
const faker = require("faker");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User1 = require("../../Models/User");

// @route GET api/users
// @desc Test route
// @access Public

router.post(
  "/",
  //   [
  //     check("firstName", "firstname is required").not().isEmpty(),
  //     check("lastName", "lastname is required").not().isEmpty(),
  //     check("email", "Please include a valid email").isEmail(),
  //     check("wallet", "Wallet amount is required").not().isEmpty().isNumeric(),
  //   ],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

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
  }
);

module.exports = router;
