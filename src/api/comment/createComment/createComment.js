import { Comment } from "../../../../models/index";

export default {
  Mutation: {
    createComment: async (_, args, { req }) => {
      const { userinfo } = req;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { boardId, boardName, content } = args;
        const { id } = userinfo;

        const create = {
          creator: id,
          boardName,
          content
        };

        if (boardName === "album") {
          create.board = boardId;
        } else if (boardName === "info") {
          create.hospital = boardId;
        }

        return Comment.create(create)
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
