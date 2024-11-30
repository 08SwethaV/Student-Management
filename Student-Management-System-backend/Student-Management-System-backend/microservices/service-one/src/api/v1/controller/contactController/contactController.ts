import { NextFunction, Request, Response } from "express";
import * as smtpService from '../../service/smtpService/smtpService';

const sendResponse = (res: Response, status: number, success: boolean, message: string, data?: any) => {
  res.status(status).json({ success, message, data });
};

const generateEmailTemplate = (formData: any) => {
  return `
    Hello,

    You have received your total marks and attendance details:

    Name: ${formData.email}
    Student Email: ${formData.name}
    Parent Mobile Number: ${formData.mobile_number}

    Marks:
    - AI: ${formData.subject1 || 0}
    - WIP: ${formData.subject2 || 0}
    - DBMS: ${formData.subject3 || 0}
    - Maths: ${formData.subject4 || 0}
    - OS: ${formData.subject5 || 0}
    Total Marks: ${formData.total}

    Attendance: ${formData.attendance}
    Thank you.
  `;
};

export const submitformData = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const data = req.body

    console.log(data)

    // Generate email template
    const emailBody = generateEmailTemplate(data);

    // Send email
    await smtpService.sendEmail(emailBody, data.name);

    sendResponse(res, 200, true, 'Email Send successfully!');
  } catch (error: any) {
    console.log(error)
    next(error);
  }
};
