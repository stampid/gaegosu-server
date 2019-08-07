import { Pet, Board, Comment, Like, Map } from "../../models/index";

export default {
  Pet: {
    owner: async pet => {
      const user = await pet.getUser();
      return user;
    }
  },
  User: {
    pets: async user => {
      const pets = await Pet.findAll({ where: { owner: user.id } });
      return pets;
    },
    boards: async user => {
      console.log("userId", user.id);
      const boards = await Board.findAll({
        where: { creator: user.id },
        order: [["id", "DESC"]]
      });
      return boards;
    },
    comments: async user => {
      console.log("userId", user.id);
      const comments = await Comment.findAll({
        where: { creator: user.id },
        order: [["id", "DESC"]]
      });
      return comments;
    }
  },
  Board: {
    creator: async board => {
      const user = await board.getUser();
      return user;
    },
    comments: async board => {
      const comments = await Comment.findAll({
        where: { board: board.id },
        order: [["id", "DESC"]]
      });
      return comments;
    }
  },
  Comment: {
    creator: async comment => {
      const user = await comment.getUser();
      return user;
    },
    board: async comment => {
      const board = await comment.getBoard();
      return board;
    },
    hospital: async comment => {
      const hospital = await comment.getMap();
      return hospital;
    }
  },
  Info: {
    comments: async Info => {
      const comments = await Comment.findAll({
        where: { hospital: Info.id },
        order: [["id", "DESC"]]
      });

      return comments;
    }
  }
};
