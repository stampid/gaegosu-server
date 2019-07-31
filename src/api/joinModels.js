import { Pet, Board } from "../../models/index";

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
    }
  },
  Board: {
    creator: async board => {
      const user = await board.getUser();
      return user;
    }
  }
};
