// importing packages
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";

// models
import model from "../models/user.model";
// utils
import response from "../utils/response";
// catching errors
import catchError from "../utils/catchError";
// secret key for jwt
import secret from "../configs/secretKey";

const controller = {};

//  user sign in control -------------------------------------------
controller.signup = catchError(async (req, res, next) => {
  // validation error
  if (!!req.validationErr)
    return response(res, null, req.validationErr, true, 400);
  let hashed_password = await bcrypt.hash(req.body.password, 5);
  let userData = { ...req.body, password: hashed_password };
  const user = new model(userData);
  const data = await user.save();

  response(res, data, "register successful", false, 200);
});

// user login control --------------------------------------------
controller.login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("error==>", err, "user==>", user);
    if (err || !user)
      return response(res, null, "Credentials incorrect", true, 404);

    req.login(user, { session: false }, (err) => {
      if (err) return next(err);

      // generate a signed json web token with the contents of user object and return it in the response
      const { name, email, _id } = user;
      const token = jwt.sign({ name, email, _id }, secret);

      //  return ({user, token})
      response(res, { user, token }, "Login Successful", false, 200);
    });
  })(req, res);
};

export default controller;
