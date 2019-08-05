import { Board, Like, Comment } from "../../../../../models/index";

export default {
  Mutation: {
    deleteAlbum: (_, args, { req }) => {
      const { userinfo } = req;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { id } = args;

        return Comment.destroy({ where: { board: id } })
          .then(_ => Like.destroy({ where: { board: id } }))
          .then(_ => Board.destroy({ where: { id } }))
          .then(_ => ({
            success: true,
            err: null,
            isLogin: true
          }))
          .catch(err => ({
            success: false,
            err,
            isLogin: true
          }));
      }

      return {
        success: false,
        err: "token expire",
        isLogin: false
      };
    }
  }
};
