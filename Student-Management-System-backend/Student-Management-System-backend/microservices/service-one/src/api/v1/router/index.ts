import express, { Router } from "express";
import AuthRouter from "./authRouter/authRouter";
import studentRouter from "./studentRouter/studentRouter";

import teacherRouter from "./teacherRouter/teacherRouter";
import contactRouter from "./contactRouter/contactRouter";
import marksRouter from "./marksRouter/marksRouter";

const router: Router = express.Router();

router.use("/auth", AuthRouter)
router.use('/student', studentRouter);
router.use('/marks', marksRouter);
router.use('/teacher', teacherRouter);
router.use("/send", contactRouter);

export default router;