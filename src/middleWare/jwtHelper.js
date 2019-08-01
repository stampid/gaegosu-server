import jwt from "jsonwebtoken";

require("dotenv").config();


export const createJWT = userinfo => {
  const token = jwt.sign({ userinfo }, process.env.PRIVATE_KEY, {

    expiresIn: "10h"
  });
  return token;
};

export const decodeJWT = token => {
  return jwt.verify(token, process.env.PRIVATE_KEY, (err, decode) => {
    if (err) {
      // console.log("decode 함수에서 에러 발생");
      return err;
    }

    console.log("decode 함수에서 에러 없음");
    return decode.userinfo;
  });
};

const JWT = async (req, res, next) => {
  const token = req.get("x-jwt");

  // 요청에서 토큰을 찾는다??
  if (!token) {
    // console.log("미들웨어에서 겟한 토큰이 없음");
    return next();
    // 없다면 패쓰
  }
  // else console.log("미들웨어에서 겟한 토큰-->", token);
  try {
    const userinfo = await decodeJWT(token);
    req.userinfo = userinfo;
    // console.log(req.nickName);
    return next();
    // 있다면 에러처리하고 패쓰!
  } catch (error) {
    console.log("err");
    return error;
  }
};
