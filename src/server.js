import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import passport from "passport";
import "./passport";
import { sequelize } from "../models";
import schema from "./schema";
import { JWT } from "./middleWare/jwtHelper";
import routes from "./routes";
import { kakaoSign, kakaofail } from "./controllers/KakaoSign";
import uploadPhoto from "./middleWare/multer";

// import socketIo from "socket.io";

dotenv.config();
const { PORT } = process.env;
// process 로 env 에 요소에 접근

const server = new GraphQLServer({
  schema,
  context: req => {
    return {
      req: req.request
    };
  }
});

const middlewares = () => {
  server.use(logger("dev"));
  server.use(cors());
  server.use(cookieParser());
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(JWT);
  server.use(uploadPhoto);
};
middlewares();

server.get(routes.kakao, passport.authenticate("kakao"));
server.get(routes.kakaofail, kakaofail);
server.get(
  routes.oauth,
  passport.authenticate("kakao", {
    failureRedirect: "/kakaofail"
  }),
  kakaoSign
);

// 이미지 업로드 테스트용 엔드포인트
// server.get("/", (req, res) => {
//   if (req.file) {
//     console.log(req.file);
//     res.send(req.file.Location);
//   }
// });

server.start({ port: PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

sequelize.sync();
// sequelize.sync()가 sync 가 되는순간 models 에 있는 스키마가 DB에 생성된다!
