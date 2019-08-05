import { Like } from "../../../../models/index";

export default {
  Mutation: {
    toggleLike: async (_, args, { req }) => {
      const { userinfo } = req;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { board, user, boardName } = args;
        return Like.findOrCreate({
          where: { board, user },
          defaults: { board, user, boardName }
        })
          .then(([like, created]) => {
            if (!created) {
              const { id } = like;
              Like.destroy({ where: { board, user, id } }).then(_ => {
                return {
                  success: true,
                  err: null,
                  isLogin: true
                };
              });
            }

            return {
              success: true,
              err: null,
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
