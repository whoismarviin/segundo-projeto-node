import {Router} from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController'
import ResetPasswordController from '../controllers/ResetPasswordController'

const passowordRouter = Router();
const forgotPassword = new ForgotPasswordController()
const resetPassword = new ResetPasswordController()


passowordRouter.post('/',forgotPassword.create);
passowordRouter.post('/',resetPassword.create);

export default passowordRouter