import { Sos } from "../../../../../models/index";

export default {
  Mutation: {
    completeRescue: (_, args, { req }) => {
      const { userinfo } = req;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { id } = args;
        return Sos.update({ status: true }, { where: { id } })
          .then(_ => ({
            success: true,
            err: null,
            isLogin: true
          }))
          .catch(err => ({
            success: false,
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
