import { Board } from "../../../../../models/index";

export default {
  Query: {
    getFirstAlbum: (_, args) => {
      const { boardName } = args;
      return Board.findAll({
        where: { boardName },
        order: [["id", "DESC"]],
        limit: 9
      })
        .then(boards => {
          return {
            success: true,
            boards,
            err: null
          };
        })
        .catch(err => ({
          success: false,
          boards: null,
          err
        }));
    }
  }
};
