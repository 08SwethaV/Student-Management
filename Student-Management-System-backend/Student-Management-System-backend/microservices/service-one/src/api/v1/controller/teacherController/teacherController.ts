import { NextFunction, Request, Response } from "express";
import * as Teacherservice from '../../service/TeacherService/TeacherService';

const sendResponse = (res: Response, status: number, success: boolean, message: string, data?: any) => {
  res.status(status).json({ success, message, data });
};

export const getAllteachers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teachers = await Teacherservice.getAllteachers();
    sendResponse(res, 200, true, "teachersretrieved successfully", teachers);
  } catch (error: any) {
    next(error);
  }
};