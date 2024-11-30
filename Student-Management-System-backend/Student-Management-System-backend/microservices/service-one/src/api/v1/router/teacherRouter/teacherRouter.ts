import express, { Router } from 'express';
import { getAllteachers } from '../../controller/teacherController/teacherController';

const teacherRouter: Router = express.Router();

teacherRouter.get('/', getAllteachers);

export default teacherRouter;