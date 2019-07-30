import { User, EmailAuth } from "../../../../../models/index";
import { generateSecret, sendSecretMail } from "../../../../utils/email";

export default {
  Query: {
    emailSend: async (_, args) => {
      const { address } = args;

      const result = await User.findOne({
        where: { email: address }
      })
        .then(data => {
          if (data) return false;

          const randomWord = generateSecret();
          sendSecretMail(address, randomWord);

          return EmailAuth.create({ email: address, randomWord });
        })
        .then(_ => {
          return true;
        })
        .catch(err => {
          console.log(err);
        });

      return result;
    },

    emailAuth: async (_, args) => {
      const { address, randomWord } = args;

      const result = await EmailAuth.findOne({
        where: { email: address, randomWord },
        order: [["id", "DESC"]]
      })
        .then(data => {
          if (data) {
            return EmailAuth.destroy({ where: { email: address } })
              .then(_ => true)
              .catch(err => console.log(err));
          }

          return false;
        })
        .catch(err => console.log(err));

      return result;
    }
  }
};
