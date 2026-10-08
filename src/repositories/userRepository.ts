import { prisma } from "../prisma";

export const findByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  });
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return await prisma.user.create({
    data: data
  });
};