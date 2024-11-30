import { object, string, z } from 'zod';

export const StudentInputSchema = object({
  student_name: string(),
  college_name: string(),
  current_year: string(),
  gmail_id: string(),
  parent_number: string(),
  address: string()
});

export const StudentUpdateSchema = object({
  student_name: string(),
  college_name: string(),
  current_year: string(),
  gmail_id: string(),
  parent_number: string(),
  address: string()
});

export const StudentDeleteSchema = object({
  studentId: string(),
});

export type IStudentInput = z.infer<typeof StudentInputSchema>;
export type IStudentUpdate = z.infer<typeof StudentUpdateSchema>;
export type IStudentDelete = z.infer<typeof StudentDeleteSchema>;