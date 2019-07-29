import { decodeJWT } from "../../../middleWare/jwtHelper";

export default {
  Query: {
    decode: (_, args) => {
      const { token } = args;
      const result = decodeJWT(token);
      return result;
    }
  }
};
