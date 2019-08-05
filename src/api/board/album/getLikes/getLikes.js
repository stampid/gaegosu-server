import { Like } from " ../../../models/index";

export default {
  Query: {
    getLikes: (_, args, { req }) => {
      const { board, boardName } = args;

      return Like.findAndCountAll({ where: { board, boardName } })
        .then(likes => {
          const { count, rows } = likes;
          const {
            userinfo: { id }
          } = req;
          let isLike = false;

          for (let i = 0; i < rows.length; i += 1) {
            if (rows[i].user === id) {
              isLike = true;
              break;
            }
          }

          return {
            isLike,
            likesCount: count,
            err: null
          };
        })
        .catch(err => ({ isLike: false, likesCount: 0, err }));
    }
  }
};
