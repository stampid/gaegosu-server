import { Pet } from "../../../../../models/index";

export default {
  Mutation: {
    changePetImage: (_, args, { req }) => {
      const { userinfo } = req;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { file } = req;
        const { id } = args;

        if (file !== undefined && file.Location !== undefined) {
          const profileImage = file.Location;
          return Pet.update(
            { profileImage },
            { where: { id, owner: userinfo.id } }
          )
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
          err: "can't find Image",
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
