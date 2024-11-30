import { NextFunction, Request, Response } from "express";
import * as studentService from '../../service/studentService/studentService';
import {
  StudentDeleteSchema,
  StudentUpdateSchema,
} from "../../validations/studentZod";
import { AppError } from "../../middleware/errorHanding";

const sendResponse = (res: Response, status: number, success: boolean, message: string, data?: any) => {
  res.status(status).json({ success, message, data });
};

export const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await studentService.getAllStudents();
    sendResponse(res, 200, true, "Students retrieved successfully", students);
  } catch (error: any) {
    next(error);
  }
};

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = StudentDeleteSchema.parse(req.params);
    const student = await studentService.getStudentById(studentId);
    sendResponse(res, 200, true, "Student retrieved successfully", student);
  } catch (error: any) {
    next(error);
  }
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const isStudentExists = await studentService.checkStudentById(studentId);
    const updatedStudentData = StudentUpdateSchema.parse(req.body);

    if (isStudentExists) {
      const updatedStudent = await studentService.updateStudent(studentId, updatedStudentData);
      sendResponse(res, 200, true, "Student updated successfully", updatedStudent);
    } else {
      throw new AppError("Student Does Not Exist", 404);
    }
  } catch (error: any) {
    next(error);
  }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = StudentDeleteSchema.parse(req.params);
    const isStudentExists = await studentService.checkStudentById(studentId);

    if (isStudentExists) {
      await studentService.deleteStudent(studentId);
      sendResponse(res, 200, true, "Student deleted successfully");
    } else {
      throw new AppError("Student Does Not Exist", 404);
    }
  } catch (error: any) {
    console.log(error)
    next(error);
  }
};