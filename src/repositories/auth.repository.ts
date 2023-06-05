import { prisma } from "../services/prisma";

export const getUser = async (email: string) => {
  const user = await prisma.usuario.findFirst({
    where: {
      email,
    },
  });
  return user;
};
