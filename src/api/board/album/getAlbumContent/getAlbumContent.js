import { Board } from "../../../../../models/index";

export default {
  Query: {
    getAlbumContent: async (_, args) => {
      const { id } = args;
      return Board.findOne({ where: { id } })
        .then(board => {
          return {
            success: true,
            board,
            err: null
          };
        })
        .catch(err => {
          return {
            success: false,
            board: null,
            err
          };
        });
    }
  }
};
