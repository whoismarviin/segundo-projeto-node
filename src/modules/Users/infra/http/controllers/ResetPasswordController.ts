import {Request,Response} from 'express'
import SenForgotPasswordEmailService from '@modules/Users/services/SendForgotEmailService';
import {container} from 'tsyringe'


export default class ResetPasswordController{
    public async create(request:Request,response:Response):Promise<Response>{

        const {email,password}= request.body

        const sendForgotEmail= container.resolve(SenForgotPasswordEmailService );

        await sendForgotEmail.execute({
            email,
        })

        return response.status(20).json({email});

    }
}