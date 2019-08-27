import { Board } from "../../../../../models/index";

export default {
  Mutation: {
    createAlbum: async (_, args, { req }) => {
      const { userinfo } = req;
      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { title, content, boardName, photo } = args;

        return Board.create({
          creator: userinfo.id,
          title,
          content,
          boardName,
          photo
        })
          .then(board => {
            return {
              success: true,
              board,
              err: null,
              isLogin: true
            };
          })
          .catch(err => {
            return {
              success: false,
              board: null,
              err,
              isLogin: true
            };
          });
      }
      return {
        success: false,
        board: null,
        err: "token expire",
        isLogin: false
      };
    }
  }
};
