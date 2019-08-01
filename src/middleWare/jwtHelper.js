import jwt from "jsonwebtoken";

require("dotenv").config();

export const createJWT = (id, nickName) => {
  const token = jwt.sign({ id, nickName }, process.env.PRIVATE_KEY, {
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
    console.log("decode 값 확인", decode);
    return decode.nickName;
  });
};

export const JWT = async (req, res, next) => {
  const token = req.get("x-jwt");

  // 요청에서 토큰을 찾는다??
  if (!token) {
    // console.log("미들웨어에서 겟한 토큰이 없음");
    return next();
    // 없다면 패쓰
  }
  // else console.log("미들웨어에서 겟한 토큰-->", token);
  try {
    const nickName = await decodeJWT(token);
    req.nickName = nickName;
    // console.log(req.nickName);
    return next();
    // 있다면 에러처리하고 패쓰!
  } catch (error) {
    console.log("err");
    return error;
  }
};
