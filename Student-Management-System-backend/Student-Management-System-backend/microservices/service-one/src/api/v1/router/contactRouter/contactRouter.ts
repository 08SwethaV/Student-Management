import express, { Router } from "express"
import { submitformData } from "../../controller/contactController/contactController";
const contactRouter: Router = express.Router();

contactRouter.post("/", submitformData)

export default contactRouter;