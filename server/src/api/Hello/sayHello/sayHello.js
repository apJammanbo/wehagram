import { prisma } from "../../../../prisma/generated/prisma-client";

export default {
  Query: {
    sayHello: async () => {
      console.log(await prisma.users());
      return "Hello111";
    }
  }
};
