const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

//* check for duplicate usernames
async function duplicates(req, res, next) {
  const { username, email } = req.body;

  const findUsername = await User.findOne({
    where: { username: username },
  });

  if (findUsername) {
    const err = new Error("User already exists");
    err.title = "User already exists";
    err.errors = {
      username: "User with that username already exists",
    };
    err.status = 500;
    return next(err);
  }

  //* check for duplicate emails
  const findEmail = await User.findOne({
    where: { email: email },
  });

  if (findEmail) {
    const err = new Error("User already exists");
    err.title = "User already exists";
    err.errors = {
      email: "User with that email already exists",
    };
    err.status = 500;
    return next(err);
  }

  return next();
}

//* Sign up new user
router.post("/", validateSignup, duplicates, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    email,
    username,
    hashedPassword,
    firstName,
    lastName,
  });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

module.exports = router;
