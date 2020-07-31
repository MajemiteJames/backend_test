const express = require("express");
const faker = require("faker");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User1 = require("../../Models/User");

// @route POST api/search
// @desc search user base on firstname and lastname
// @access Public
router.post(
  "/",
  [check("firstName", "First name is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }
    const { firstName, lastName } = req.body;

    try {
      let user = await User1.findOne({ firstName });
      let userLastname = await User1.findOne({ lastName });

      if (!user) {
        return res
          .status(404)
          .json({ status: 404, errors: [{ msg: "User does not exist" }] });
      }
      if (!userLastname) {
        return res
          .status(404)
          .json({ status: 404, errors: [{ msg: "User does not exist" }] });
      }

      return res
        .status(200)
        .json({ status: 200, message: "User credited successfully", user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/search
// @desc get user sorted base on last entry
// @access Public

router.get("/lastentry/", async (req, res) => {
  try {
    const users = await User1.find().sort({ _id: -1 }).limit(1);
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/search
// @desc get user sorted base on last entry
// @access Public

router.get("/allentry/", async (req, res) => {
  try {
    const users = await User1.find().sort({ datetime: -1 });
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/search
// @desc get user sorted out by wallet amount
// @access Public

router.get("/wallet/:wallet", async (req, res) => {
  try {
    const users = await User1.find({ wallet: req.params.wallet }).sort({
      date: -1,
    });
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route Get api/search
// @desc get all users
// @access Public

router.get("/", async (req, res) => {
  const amount = req.params.lessIncome;

  try {
    const users = await User1.find().populate("user", [
      "firstName",
      "lastName",
      "email",
      "wallet",
    ]);

    return res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route    GET api/search
// @desc     Get user by filter details
// @access   Private
router.get("/filter/:filter", async (req, res) => {
  const filterInfo = req.params.filter;

  // Build disease object
  const userFields = {};
  if (filterInfo) {
    userFields.filterInfo = filterInfo
      .split(",")
      .map((keyword) => keyword.trim());
  }

  try {
    const user = await User1.find({ wallet: { $all: userFields.filterInfo } });

    if (!user) {
      return res.status(400).json({ msg: "There are no user Case Available" });
    }

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
