import jwt from "jsonwebtoken";

require("dotenv").config();

export const createJWT = nickName => {
  const token = jwt.sign({ nickName }, process.env.PRIVATE_KEY, {
    expiresIn: "10h"
  });
  return token;
};

export const decodeJWT = token => {
  return jwt.verify(token, process.env.PRIVATE_KEY, (err, decode) => {
    if (err) return console.log("false");
    return decode.nickName;
  });
};
