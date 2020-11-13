import json2xls from "json2xls";
import fs from "fs";

// upload file
import uploadXls from "./upload";

export const toXlsx = async (file) => {
  try {
    let xls = json2xls(file);
    fs.writeFileSync("sample.xlsx", xls, "binary", async (err) => {
      if (err) {
        throw err;
      }
    });
    return await uploadXls("sample.xlsx");
  } catch (err) {
    console.log("error in handling and uploading==>", err);
    return "";
  }
};

export const removeFile = () => {
  fs.unlink("sample.xlsx", (err) => {
    if (err) {
      console.log("error in removing file =>", err);
    }
  });
};
export default toXlsx;
