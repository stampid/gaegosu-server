import sequelize from "sequelize";
import { Map } from "../../../../../models/index";

export default {
  Query: {
    getInfoList: (_, args) => {
      const { locationX, locationY } = args;
      const X = 0.003931;
      const Y = 0.008484;

      const where = {
        [sequelize.Op.and]: {
          locationX: {
            [sequelize.Op.and]: {
              [sequelize.Op.lte]: locationX + X,
              [sequelize.Op.gte]: locationX - X
            }
          },
          locationY: {
            [sequelize.Op.and]: {
              [sequelize.Op.lte]: locationY + Y,
              [sequelize.Op.gte]: locationY - Y
            }
          }
        }
      };
      return Map.findAll({ where })
        .then(info => {
          return {
            success: true,
            info,
            err: null
          };
        })
        .catch(err => {
          return {
            success: false,
            info: null,
            err
          };
        });
    }
  }
};
