import { User } from "../../../../../models/index";

export default {
  Query: {
    localLogin: async (_, args) => {
      const { email, password } = args;
      return User.findOne({ where: { email, password } })
        .then(data => {
          if (data) {
            return {
              isLogin: true,
              user: data,
              err: null,
              token: "token"
            };
          }

          return {
            isLogin: false,
            user: null,
            err: "Login fail",
            token: null
          };
        })
        .catch(err => console.log(err));
    }
  }
};
