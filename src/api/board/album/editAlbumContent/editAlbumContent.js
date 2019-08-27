import { Board } from "../../../../../models/index";

export default {
  Mutation: {
    editAlbum: async (_, args, { req }) => {
      const { userinfo } = req;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { id, title, content } = args;
        const updateObject = {
          title,
          content
        };
        if (req.file !== undefined) {
          updateObject.photo = req.file.location;
        }

        return Board.update(updateObject, {
          where: { id, creator: userinfo.id }
        })
          .then(_ => {
            return Board.findOne({ where: { id, creator: userinfo.id } });
          })
          .then(board => {
            if (board) {
              return {
                success: true,
                err: null,
                isLogin: true,
                board
              };
            }

            return {
              success: false,
              err: "can't find board",
              isLogin: true,
              board: null
            };
          })
          .catch(err => {
            return {
              success: false,
              err,
              isLogin: true,
              board: null
            };
          });
      }
      return {
        success: false,
        err: "token expire",
        isLogin: false,
        board: null
      };
    }
  }
};
