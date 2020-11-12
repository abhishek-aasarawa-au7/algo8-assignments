import { check, validationResult } from "express-validator";

// model
import userModel from "../models/user.model";

// simplify error
import simplyfyErr from "../utils/simplyfyErr";

// checking if email is uniq or not
const isUniqEmail = async (value) => {
  try {
    let user = await userModel.findOne({ email: value });

    // if no user
    if (!!user) throw new Error("");

    return true;
  } catch (err) {
    throw err;
  }
};

export const signUpChecker = [
  check("email")
    .exists()
    .withMessage("Please provide email.")
    .isEmail()
    .withMessage("Please provide correct email.")
    .custom(isUniqEmail)
    .withMessage(`Email is already registered. Please try Login`),

  check("password")
    .exists()
    .withMessage("Please provide password.")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 to 20 char long."),

  check("name")
    .exists()
    .withMessage("Please provide name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("user name must be between 2 to 50 char long"),
];

export const checkError = (req, res, next) => {
  try {
    validationResult(req).throw();
  } catch (err) {
    const singleKeyError = simplyfyErr(err.array());
    const errors = singleKeyError.map((e) => e.msg);
    const message = errors.join(",");
    req.validationErr = message;
  }
  next();
};
