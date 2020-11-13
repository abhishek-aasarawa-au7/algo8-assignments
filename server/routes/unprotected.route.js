import express from "express";

// controller file
import userController from "../controllers/user.controller";

// data validator
import { signUpChecker, checkError } from "../middlewares/validator.middleware";

const route = express.Router();

// routes
route.post("/signup", signUpChecker, checkError, userController.signup);
route.post("/login", userController.login);
route.post("/regenerate", userController.regenerate);

export default route;
