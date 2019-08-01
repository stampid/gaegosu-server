import { Pet, User, Board, Comment } from "../../../models/index";

export default {
  Query: {
    testsayHello: () => "hi!",
    testpet: async (_, args) => {
      const { id } = args;
      const pet = await Pet.findOne({ where: { id } });
      return pet;
    },
    testuser: async (_, args) => {
      const { id } = args;
      const user = await User.findOne({ where: { id } });
      return user;
    }
  },
  Mutation: {
    testcreateBoard: async (_, args) => {
      const { creator, title, content, photo, boardName } = args;
      return Board.create({
        creator,
        title,
        content,
        photo,
        boardName
      })
        .then(board => {
          return board;
        })
        .catch(err => console.log(err));
    },
    testcreateComment: async (_, args) => {
      const { creator, content, board, boardName } = args;
      return Comment.create({
        creator,
        board,
        content,

        boardName
      })
        .then(Comment => {
          console.log(Comment);
          return Comment;
        })
        .catch(err => console.log(err));
    }
  }
};
// resolver test
