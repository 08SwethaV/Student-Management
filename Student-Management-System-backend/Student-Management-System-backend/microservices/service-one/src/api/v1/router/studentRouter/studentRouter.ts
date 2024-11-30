import express, { Router } from 'express';
import { deleteStudent, getAllStudents, getStudentById, updateStudent } from '../../controller/studentController/studentController';
const studentRouter: Router = express.Router();

studentRouter.get('/', getAllStudents);
studentRouter.get('/:studentId', getStudentById);
studentRouter.put('/:studentId', updateStudent);
studentRouter.delete('/:studentId', deleteStudent);

export default studentRouter;