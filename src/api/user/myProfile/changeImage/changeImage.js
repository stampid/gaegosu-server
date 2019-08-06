import { User } from "../../../../../models/index";

export default {
  Mutation: {
    changeImage: (_, __, { req }) => {
      const { userinfo } = req;
      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { file } = req;
        const { id, nickName } = userinfo;
        if (file.Location !== undefined) {
          const profileImage = file.Location;
          return User.update({ profileImage }, { where: { id, nickName } })
            .then(_ => ({
              success: true,
              err: null,
              isLogin: true,
              profileImage
            }))
            .catch(err => ({
              success: false,
              err,
              isLogin: true,
              profileImage: null
            }));
        }

        return {
          success: false,
          err: "can't find file",
          isLogin: true,
          profileImage: null
        };
      }

      return {
        success: false,
        err: "token expire",
        isLogin: false,
        profileImage: null
      };
    }
  }
};
