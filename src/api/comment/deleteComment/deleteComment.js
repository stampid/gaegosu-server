import { Comment } from "../../../../models/index";

export default {
  Mutation: {
    deleteComment: async (_, args, { req }) => {
      const { userinfo } = req;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { id } = args;
        return Comment.destroy({
          where: { id, creator: userinfo.id }
        }).then(deleteCount => {
          if (deleteCount > 0) {
            return {
              success: true,
              err: null,
              isLogin: true
            };
          }

          return {
            success: false,
            err: "can't delete comment",
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
