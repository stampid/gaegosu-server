import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import passport from "passport";
import { sequelize } from "../models";
import schema from "./schema";
import { decodeJWT } from "./middleWare/jwtHelper";
// import socketIo from "socket.io";

dotenv.config();
// dotenv file 에 접근 가능하게 해준다.

const { PORT } = process.env;
// process 로 env 에 요소에 접근

const server = new GraphQLServer({
  schema
  // context: req => {
  //   return {
  //     req: req.request
  //   };
  // }
});

// const JWT = async (req, res, next) => {
//   const token = req.get("x-JWT");
//   if (token) {
//     const nickName = await decodeJWT(token);
//     return nickName;
//   }
//   next();
// };

const middlewares = () => {
  server.use(logger("dev"));
  server.use(cors());
  server.use(cookieParser());
  server.use(passport.initialize());
  server.use(passport.session());
  // server.use(JWT);
};
middlewares();

server.start({ port: PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

// sequelize.sync();
// sequelize.sync()가 sync 가 되는순간 models 에 있는 스키마가 DB에 생성된다!
