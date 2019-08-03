import { Comment } from "../../../../models/index";

export default {
  Mutation: {
    editComment: async (_, args, { req }) => {
      const { userinfo } = req;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { id, content } = args;
        const updateObject = {
          content
        };
        return Comment.update(updateObject, {
          where: { id, creator: userinfo.id }
        })
          .then(_ => {
            return Comment.findOne({ where: { id, creator: userinfo.id } });
          })
          .then(comment => {
            if (comment) {
              return {
                success: true,
                err: null,
                comment,
                isLogin: true
              };
            }

            return {
              success: false,
              err: "can't update comment",
              comment: null,
              isLogin: true
            };
          });
      }

      return {
        success: false,
        err: "token expire",
        comment: null,
        isLogin: false
      };
    }
  }
};
