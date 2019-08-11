import { Comment } from "../../../../models/index";

export default {
  Query: {
    getComments: (_, args, { req }) => {
      const { userinfo } = req;
      const { id, boardName } = args;
      const where = {
        boardName
      };
      let isLogin = false;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        isLogin = true;
      }

      if (boardName === "info") {
        where.hospital = id;
      } else {
        where.board = id;
      }

      return Comment.findAll({
        where
      })
        .then(data => {
          if (data) {
            const comments = [];
            let isMe = false;
            for (let i = 0; i < data.length; i += 1) {
              isMe = false;
              if (userinfo !== undefined && data[i].creator === userinfo.id) {
                isMe = true;
              }
              comments.push({ isMe, comment: data[i] });
            }

            return {
              success: true,
              err: null,
              comments,
              isLogin
            };
          }

          return {
            success: true,
            err: "can't find comments",
            comments: null,
            isLogin
          };
        })
        .catch(err => ({
          success: false,
          err,
          comments: [],
          isLogin
        }));
    }
  }
};
