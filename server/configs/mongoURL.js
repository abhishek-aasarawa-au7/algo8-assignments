import dotenv from "dotenv";
dotenv.config();

let mongoURL = "";

if (process.env.NODE_ENV === "development")
  mongoURL = process.env.MONGO_URI_DEV;
else mongoURL = process.env.MONGO_URI_PROD;

export default mongoURL;
