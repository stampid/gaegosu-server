import { Map } from "../../../../../models/index";

export default {
  Query: {
    getInfo: (_, args) => {
      const { id } = args;

      return Map.findOne({ where: id })
        .then(info => {
          if (info) {
            return {
              success: true,
              err: null,
              info
            };
          }

          return {
            success: false,
            err: "can't find hospital",
            info: null
          };
        })
        .catch(err => ({
          success: false,
          err,
          info: null
        }));
    }
  }
};
