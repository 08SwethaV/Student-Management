import prisma from "../../../../../prisma/client/prismaClient";

export const getAllteachers = async () => {
  try {
    const teachers = await prisma.user.findMany({
      where: {
        role: "TEACHER"
      }
    });
    return teachers;
  } catch (error) {
    throw error;
  }
};