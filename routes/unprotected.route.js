import express from "express";

// response function
import response from "../utils/response";

const route = express.Router();

route.get("/", (req, res) =>
  response(res, [], "Server is running well", false, 200)
);

export default route;
