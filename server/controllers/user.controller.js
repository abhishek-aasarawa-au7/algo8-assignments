// importing packages
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";

// models
import model from "../models/user.model";
// utils
import response from "../utils/response";
// catching errors
import catchError from "../utils/catchError";
// token
import createToken from "../utils/createToken";
// refresh secret key
import refreshKey from "../configs/refreshKey";
// upload file
import uploadXls from "../utils/upload";
// file handling
import { toXlsx, removeFile } from "../utils/toXlsx";

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
      // standard token
      const token = createToken({ name, email, _id });
      // refresh token
      const refreshToken = createToken({ name, email, _id }, true);

      //  return ({user, token})
      response(
        res,
        { user, token, refreshToken },
        "Login Successful",
        false,
        200
      );
    });
  })(req, res);
};

// regenerating token -------------------------------------------------------------------
controller.regenerate = catchError(async (req, res, next) => {
  let { refreshToken } = req.body;

  // if refresh token is not send
  if (!refreshToken)
    return response(req, [], "No refresh Token found", true, 404);

  // extract payload from refresh token
  const payload = await jwt.verify(refreshToken, refreshKey);
  let { name, email, _id } = payload;
  const token = createToken({ name, email, _id });

  // return payload
  response(res, { token }, "Token regenerated successfully", false, 200);
});

// protected data
controller.data = (req, res) => {
  response(res, [], "this is protected route", false, 200);
};

// making xlsx file ---------------------------------------------------------------------
controller.xlsx = catchError(async (req, res, next) => {
  const { pageNumber = 1 } = req.query;
  // all user data
  const users = await model
    .find({})
    .skip(20 * (pageNumber - 1))
    .limit(20);
  const data = users.map((user) => ({ name: user.name, email: user.email }));

  // if there is no data
  if (!!data && data.length === 0)
    return response(res, [], "There is no data", true, 404);

  // converting in xls
  let url = await toXlsx(data);
  if (!url)
    return response(
      res,
      [],
      "server facing issue in converting and uploading data",
      true,
      400
    );

  // if we get url
  removeFile();

  response(res, { url }, "successfully able to get url of xls", false, 200);
});

export default controller;
