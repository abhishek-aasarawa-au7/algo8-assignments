import jwt from "jsonwebtoken";

import secret from "../configs/secretKey";
import refreshKey from "../configs/refreshKey";

const createToken = (data, isRefresh = false) => {
  let token = jwt.sign(data, isRefresh ? refreshKey : secret, {
    expiresIn: isRefresh ? "2 days" : "10m",
  });
  return token;
};

export default createToken;
