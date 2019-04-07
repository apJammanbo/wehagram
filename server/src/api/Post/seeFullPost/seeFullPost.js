import { prisma } from "../../../../prisma/generated/prisma-client";
import { COMMENT_FRAGMENT, FULL_POST_FRAGMENT } from "../../../fragment";

export default {
  Query: {
    seeFullPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      return await prisma.post({ id }).$fragment(FULL_POST_FRAGMENT);
    }
  }
};
