import { NextFunction, Request, Response } from "express";
import * as marksService from '../../service/marksService/marksService';
import {
  MarksInputSchema,
  MarksDeleteSchema,
  MarksUpdateSchema,
} from "../../validations/marksZod";
import { AppError } from "../../middleware/errorHanding";

const sendResponse = (res: Response, status: number, success: boolean, message: string, data?: any) => {
  res.status(status).json({ success, message, data });
};

export const getAllMarks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const marks = await marksService.getAllMarks();
    sendResponse(res, 200, true, "Marks retrieved successfully", marks);
  } catch (error: any) {
    next(error);
  }
};

export const getMarksById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { markId } = MarksDeleteSchema.parse(req.params);
    const mark = await marksService.getMarksById(markId);
    sendResponse(res, 200, true, "Mark retrieved successfully", mark);
  } catch (error: any) {
    next(error);
  }
};

export const updateMarks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { markId } = req.params;
    const isMarkExists = await marksService.checkMarksById(markId);
    const updatedMarkData = MarksUpdateSchema.parse(req.body);

    if (isMarkExists) {
      const updatedMark = await marksService.updateMarks(markId, updatedMarkData);
      sendResponse(res, 200, true, "Mark updated successfully", updatedMark);
    } else {
      throw new AppError("Mark Does Not Exist", 404);
    }
  } catch (error: any) {
    next(error);
  }
};

export const deleteMarks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { markId } = MarksDeleteSchema.parse(req.params);
    const isMarkExists = await marksService.checkMarksById(markId);

    if (isMarkExists) {
      await marksService.deleteMarks(markId);
      sendResponse(res, 200, true, "Mark deleted successfully");
    } else {
      throw new AppError("Mark Does Not Exist", 404);
    }
  } catch (error: any) {
    next(error);
  }
};