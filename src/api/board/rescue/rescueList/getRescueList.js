import { Sos } from "../../../../../models/index";

export default {
  Query: {
    getRescueList: (_, __, { req }) => {
      const { userinfo } = req;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        return Sos.findAll({ order: [["status", "ASC"], ["id", "DESC"]] })
          .then(sos => ({
            success: true,
            err: null,
            isLogin: true,
            rescueList: sos
          }))
          .catch(err => ({
            success: false,
            err,
            isLogin: true,
            rescueList: null
          }));
      }

      return {
        success: false,
        err: "token expire",
        isLogin: false,
        rescueList: null
      };
    }
  }
};
