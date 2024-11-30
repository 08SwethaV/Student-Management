
import prisma from "../../../../../prisma/client/prismaClient";
import { AppError } from "../../middleware/errorHanding";
import { IStudentInput, IStudentUpdate } from "../../validations/studentZod";

export const getAllStudents = async () => {
  try {
    const students = await prisma.student.findMany({
      include: {
        marks: true,
      }
    });
    return students;
  } catch (error) {
    throw error;
  }
};

export const getStudentById = async (studentId: string) => {
  try {
    const student = await prisma.student.findUnique({
      where: { student_id: studentId },
      include: {
        marks: true
      }
    });

    if (!student) {
      throw new AppError('Student not found', 404);
    } else {
      return student;
    }
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (studentId: string, updatedStudentData: IStudentUpdate) => {
  try {
    const updatedStudent = await prisma.student.update({
      where: { student_id: studentId },
      data: updatedStudentData,
    });
    return updatedStudent;
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async (email: string) => {
  try {
    const deletedStudent = await prisma.user.delete({
      where: { email: email },
    });
    return deletedStudent;
  } catch (error) {
    throw error;
  }
};

export const checkStudentById = async (studentId: string) => {
  try {
    const student = await prisma.user.findUnique({
      where: { email: studentId },
    });

    if (!student) {
      throw new AppError('Student not found', 404);
    } else {
      return true;
    }
  } catch (error) {
    throw error;
  }
};