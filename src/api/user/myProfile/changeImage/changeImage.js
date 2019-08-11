import { User } from "../../../../../models/index";

export default {
  Mutation: {
    changeImage: (_, args, { req }) => {
      const { userinfo } = req;
      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { id, nickName } = userinfo;
        const { profileImage } = args;

        return User.update({ profileImage }, { where: { id, nickName } })
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
