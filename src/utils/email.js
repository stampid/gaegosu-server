import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import { adjectives, nouns } from "./words";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };

  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "gaegosu@naver.com",
    to: address,
    subject: "SingUp Secret for Gaegosu",
    html: `Hello Your login secret it <h1>${secret}</h1>.<br/> Copy paste on the Web to Sign Up`
  };

  return sendMail(email);
};
