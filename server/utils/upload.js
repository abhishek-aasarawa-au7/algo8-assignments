import cloudLib from "cloudinary";
import fs from "fs";

// importing cloudinary config variables
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../configs/cloudinary";

const cloudinary = cloudLib.v2;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadXls = async (file) => {
  try {
    if (!!file) {
      let response = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
      });
      return response.secure_url;
    } else throw new Error("file is empty");
  } catch (err) {
    console.log("error in uploading ==>", err);
    return "";
  }
};

export default uploadXls;
