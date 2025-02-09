import { prisma_client } from "../config/prismaClient";

export const getUser = async (data: { id?: string; email?: string }) => {
  if (!data.email && !data.id) {
    throw new Error("Invalid user Id or Email");
  }
  try {
    const user = await prisma_client.user.findUnique({
      where: data.id ? { id: data.id } : { email: data.email },
    });

    return user;
  } catch (error) {
    throw new Error("Something went wrong while fetching user");
  }
};
