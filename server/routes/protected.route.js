import express from "express";

// controller file
import userController from "../controllers/user.controller";

// route init
const route = express.Router();

route.get("/data", userController.data);

export default route;
