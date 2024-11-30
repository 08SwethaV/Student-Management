import express, { Router } from 'express';
import { loginUser, registerUser } from '../../controller/authController/authController';

const AuthRouter: Router = express.Router();

AuthRouter.post('/login', loginUser);
AuthRouter.post('/register', registerUser);

export default AuthRouter;