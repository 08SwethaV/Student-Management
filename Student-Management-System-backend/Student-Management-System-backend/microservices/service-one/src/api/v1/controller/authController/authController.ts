import { Request, Response } from "express";
import { register, login, checkUnqineUser } from "../../service/authService/authService";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, dob, role, student_name, college_name, current_year, gmail_id, parent_number, address, attendance } = req.body;
    const ress = await checkUnqineUser({ email })
    if (ress) {
      const user = await register({ email, dob, role, student_name, college_name, current_year, gmail_id, parent_number, address, attendance });
      const { password, ...userData } = user
      return res.status(201).json(userData);
    } else {
      res.status(400).json({ message: "User Already Exists" })
    }
  } catch (error) {
    res.status(400).json({ error: "Internal Server Error", err: error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password)
    const { token, user } = await login({ email, password });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ error: "Internal Server Error" });
  }
};