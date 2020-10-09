import {Request,Response} from 'express'
import AuthenticateUserService from '@modules/Users/services/AuthenticateUser';
import {container} from 'tsyringe'


export default class SessionsController{
    public async create(request:Request,response:Response):Promise<Response>{

        const {email,password}= request.body

        const authenticateUser = container.resolve(AuthenticateUserService);

        const {user,token} = await authenticateUser.execute({
            email,
            password,
        })

        return response.json({user,token});

    }
}