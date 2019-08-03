import { Comment } from "../../../../models/index";

export default {
  Mutation: {
    createComment: async (_, args, { req }) => {
      const { userinfo } = req;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { board, boardName, content } = args;
        const { id } = userinfo;

        return Comment.create({
          creator: id,
          board,
          boardName,
          content
        })
          .then(comment => {
            if (comment) {
              return {
                success: true,
                err: null,
                isLogin: true,
                comment
              };
            }
            return {
              success: false,
              err: "can't create comment",
              isLogin: true,
              comment: null
            };
          })
          .catch(err => {
            return {
              success: false,
              err,
              isLogin: true,
              comment: null
            };
          });
      }

      return {
        success: false,
        err: "token expire",
        isLogin: false,
        comment: null
      };
    }
  }
};
