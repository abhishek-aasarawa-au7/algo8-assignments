import dotenv from "dotenv";
dotenv.config();

let mongoURL = "";

if (process.env.NODE_ENV === "production")
  mongoURL = process.env.MONGO_URI_PROD;
else mongoURL = process.env.MONGO_URI_DEV;

export default mongoURL;
