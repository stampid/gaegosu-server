import { Pet, User } from "../../../models/index";

export default {
  Query: {
    sayHello: () => "hi!",
    pet: async (_, args) => {
      const { id } = args;
      const pet = await Pet.findOne({ where: { id } });
      return pet;
    },
    user: async (_, args) => {
      const { id } = args;
      const user = await User.findOne({ where: { id } });
      return user;
    }
  }
};
// resolver test
