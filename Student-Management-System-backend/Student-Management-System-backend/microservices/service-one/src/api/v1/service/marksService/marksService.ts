import prisma from "../../../../../prisma/client/prismaClient";
import { AppError } from "../../middleware/errorHanding";
import { IMarksInput, IMarksUpdate } from "../../validations/marksZod";

export const getAllMarks = async () => {
  try {
    const marks = await prisma.marks.findMany({
      select: {
        student: true
      }
    });
    return marks;
  } catch (error) {
    throw error;
  }
};

export const getMarksById = async (markId: string) => {
  try {
    const mark = await prisma.marks.findUnique({
      where: { student_id: markId },
    });

    if (!mark) {
      throw new AppError('Mark not found', 404);
    } else {
      return mark;
    }
  } catch (error) {
    throw error;
  }
};

export const updateMarks = async (markId: string, updatedMarkData: IMarksUpdate) => {
  try {
    const updatedMark = await prisma.marks.update({
      where: { student_id: markId },
      data: updatedMarkData,
    });
    return updatedMark;
  } catch (error) {
    throw error;
  }
};

export const deleteMarks = async (markId: string) => {
  try {
    const deletedMark = await prisma.marks.delete({
      where: { student_id: markId },
    });
    return deletedMark;
  } catch (error) {
    throw error;
  }
};

export const checkMarksById = async (markId: string) => {
  try {
    const mark = await prisma.marks.findUnique({
      where: { student_id: markId },
      select: {
        mark_id: true,
      },
    });

    if (!mark) {
      throw new AppError('Mark not found', 404);
    } else {
      return true;
    }
  } catch (error) {
    throw error;
  }
};