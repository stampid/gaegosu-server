import { Comment } from "../../../../models/index";

export default {
  Query: {
    getComments: (_, args, { req }) => {
      const { userinfo } = req;
      const { id, boardName } = args;
      let isLogin = false;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        isLogin = true;
      }

      return Comment.findAll({
        where: { board: id, boardName }
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
