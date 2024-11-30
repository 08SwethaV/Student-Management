import express, { Router } from 'express';
import { deleteMarks, getAllMarks, getMarksById, updateMarks } from '../../controller/marksController/marksController';
const marksRouter: Router = express.Router();

marksRouter.get('/', getAllMarks);
marksRouter.get('/:markId', getMarksById);
marksRouter.put('/:markId', updateMarks);
marksRouter.delete('/:markId', deleteMarks);

export default marksRouter;
