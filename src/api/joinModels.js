import { User, Pet } from "../../models/index";

export default {
  Pet: {
    owner: async pet => {
      const user = await pet.getUser();
      return user;
    }
  },
  User: {
    pets: async user => {
      console.log(user.id);
      const pets = await Pet.findAll({ where: { owner: user.id } });
      return pets;
    }
  }
};
