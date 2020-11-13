import express from "express";
import userController from "../controllers/user.controller";

const route = express.Router();

route.get("/file", userController.xlsx);

export default route;
