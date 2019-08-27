import sequelize from "sequelize";
import { Board, User } from "../../../../../models/index";

export default {
  Mutation: {
    searchAlbum: (_, args) => {
      const { category, searchWord, lastId, boardName } = args;

      // 작성자 검색
      // 작성자 이름이 들오면
      // 작성자가 작성한 게시물들을 찾아야됨
      // 내림 차순으로 정렬된 상태에서
      // lastId가 있으면 그 id 밑으로 찾아야됨
      // 없으면 가장 마지막 id를 가진애를 리턴하면됨
      // 검색어가 있으면 검색어가 있는 상태로 해야함

      const order = [["id", "DESC"]];
      const limit = 3;

      // 작성자로 게시글 검색
      if (category === "작성자") {
        return User.findAll({
          where: { nickName: { [sequelize.Op.like]: `%${searchWord}%` } }
        })
          .then(data => {
            const ids = [];
            for (let i = 0; i < data.length; i += 1) {
              ids.push(data[i].id);
            }

            const where = {
              creator: ids
            };
            if (lastId !== 0) {
              where.id = {
                [sequelize.Op.lt]: lastId
              };
            }
            return Board.findAll({
              where,
              order,
              limit,
              boardName
            });
          })
          .then(boards => ({
            success: true,
            err: null,
            boards
          }))
          .catch(err => ({
            success: false,
            err,
            boards: null
          }));
      }

      // 게시글 이름으로 검색
      if (category === "제목") {
        const where = {
          title: { [sequelize.Op.like]: `%${searchWord}%` }
        };

        if (lastId !== 0) {
          where.id = {
            [sequelize.Op.lt]: lastId
          };
        }
        return Board.findAll({
          where,
          order,
          limit
        })
          .then(boards => ({
            success: true,
            err: null,
            boards
          }))
          .catch(err => ({
            success: false,
            err,
            boards: null
          }));
      }
    }
  }
};

// include 로 유저 모두 찾아서 반환하기
