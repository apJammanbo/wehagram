import { prisma } from "../../../../prisma/generated/prisma-client";
import { generateToken } from "../../../util";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        // JWT
        const token = generateToken(user.id);
        return token;
      } else {
        throw Error("wrong email/secret combination");
      }
    }
  }
};
