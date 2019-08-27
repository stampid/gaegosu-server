import { User } from "../../../../../models/index";

export default {
  Mutation: {
    changeNickName: async (_, args, { req }) => {
      const { newNickName } = args;
      const { userinfo } = req;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { id } = userinfo;
        return User.update({ nickName: newNickName }, { where: { id } })
          .then(data => {
            if (data) {
              return {
                success: true,
                err: null,
                isLogin: true
              };
            }
            return {
              success: false,
              err: "NickName Change fail",
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
