import { object, string, z } from 'zod';

export const MarksInputSchema = object({
  total_marks: string(),
  student_id: string(),
});

export const MarksUpdateSchema = object({
  total_marks: string(),
  subject1: string(),
  subject2: string(),
  subject3: string(),
  subject4: string(),
  subject5: string(),
});

export const MarksDeleteSchema = object({
  markId: string(),
});

export type IMarksInput = z.infer<typeof MarksInputSchema>;
export type IMarksUpdate = z.infer<typeof MarksUpdateSchema>;
export type IMarksDelete = z.infer<typeof MarksDeleteSchema>;