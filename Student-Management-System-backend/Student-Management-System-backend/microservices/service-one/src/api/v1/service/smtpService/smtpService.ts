import { AppError } from "../../middleware/errorHanding";
require('dotenv').config()
import nodemailer from "nodemailer"

export const sendEmail = async (body: string, email: any) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });

    const mailOptions = {
      from: process.env.fromEmail,
      to: email,
      subject: `Total marks and Attendance details`,
      text: `${body}`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email Sent", info.response);

    return "Your message was sent successfully";
  } catch (error) {
    console.log(error)
    throw new AppError("Error sending email", 500);
  }
};