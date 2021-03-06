import { Pet } from "../../../../../models/index";

export default {
  Mutation: {
    changePetImage: (_, args, { req }) => {
      const { userinfo } = req;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { id, profileImage } = args;

        return Pet.update(
          { profileImage },
          { where: { id, owner: userinfo.id } }
        )
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
