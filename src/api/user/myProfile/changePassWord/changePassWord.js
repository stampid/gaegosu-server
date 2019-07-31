import { User } from "../../../../../models/index";

export default {
  Mutation: {
    changePassWord: async (_, args, { req }) => {
      const { password } = args;
      const { nickName } = req;
      if (nickName !== undefined) {
        return User.update({ password }, { where: { nickName } })
          .then(user => {
            if (user) {
              return {
                success: true,
                err: null,
                isLogin: true
              };
            }

            return {
              success: false,
              err: "PassWord Change fail",
              isLogin: true
            };
          })
          .catch(err => {
            return {
              success: false,
              err,
              isLogin: true
            };
          });
      }
      return {
        success: false,
        err: "token expire",
        isLogin: false
      };
    }
  }
};
