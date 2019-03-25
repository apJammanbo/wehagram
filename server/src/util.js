import dotenv from "dotenv";
dotenv.config();
import { adjectives, nouns } from "./word";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

/**
 * 암호 단어를 생성한다.
 */
export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  const randomNumber2 = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber2]}`;
};

/**
 * 이메일 전송
 */
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

/**
 * 암호 단어 메일전송
 */
export const sendSecretMail = (address, secret) => {
  const email = {
    from: "apjammanbo@gmail.com",
    to: address,
    subject: "🔒Login Secret for wehagram🔒",
    html: `Hello Your login secret is ${secret}. <br/>Copy Paste on the app/web to loggin `
  };
  return sendMail(email);
};
