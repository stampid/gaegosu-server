import { Board } from "../../../../../models/index";

export default {
  Query: {
    getAlbumContent: async (_, args, { req }) => {
      const { id } = args;
      const { userinfo } = req;
      let isLogin = false;
      let isMe = false;
      if (userinfo !== undefined && userinfo.id !== undefined) {
        isLogin = true;
      }

      return Board.findOne({ where: { id } })
        .then(board => {
          if (board) {
            if (userinfo !== undefined && board.creator === userinfo.id) {
              isMe = true;
            }
            return {
              success: true,
              board,
              isLogin,
              isMe,
              err: null
            };
          }

          return {
            success: false,
            board: null,
            isLogin,
            isMe,
            err: "can't find board"
          };
        })
        .catch(err => {
          return {
            success: false,
            isMe,
            isLogin,
            board: null,
            err
          };
        });
    }
  }
};
