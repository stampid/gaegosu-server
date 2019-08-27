import db, { User, Pet } from "../../../../../models/index";

export default {
  Mutation: {
    deleteAccount: async (_, __, { req }) => {
      const { userinfo } = req;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { id } = userinfo;
        return Pet.destroy({
          where: { owner: id }
        })
          .then(_ => db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0"))
          .then(_ => {
            return User.destroy({
              where: { id }
            });
          })
          .then(() => db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1"))
          .then(() => {
            return {
              success: true,
              isLogin: false,
              err: null
            };
          })
          .catch(err => {
            return {
              success: false,
              isLogin: false,
              err
            };
          });
      }

      return {
        success: false,
        isLogin: false,
        err: "token expire"
      };
    }
  }
};
