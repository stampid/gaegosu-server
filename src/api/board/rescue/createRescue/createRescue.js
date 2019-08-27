import { Sos } from "../../../../../models/index";

export default {
  Mutation: {
    createRescue: (_, args, { req }) => {
      const { userinfo } = req;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { locationX, locationY, content, photo = "" } = args;
        return Sos.create({
          locationX,
          locationY,
          creator: userinfo.id,
          content,
          photo,
          status: false
        })
          .then(_ => ({
            success: true,
            err: null,
            isLogin: true
          }))
          .catch(err => ({
            success: true,
            err,
            isLogin: true
          }));
      }

      return {
        success: false,
        err: "token expire",
        isLogin: false
      };
    }
  }
};
