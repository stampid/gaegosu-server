// import User from "../../../models/index";
import { createJWT } from "../../../middleWare/jwtHelper";

export default {
  Query: {
    Token: (_, args) => {
      const { nickName } = args;
      const token = createJWT(nickName);
      return token;
    }
  }
};
