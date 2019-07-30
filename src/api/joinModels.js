export default {
  Pet: {
    owner: async pet => {
      const user = await pet.getUser();
      return user;
    }
  },
  User: {
    pets: async user => {
      const pets = await user.getPet();
      return pets;
    }
  }
};
