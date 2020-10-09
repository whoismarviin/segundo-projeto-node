import "reflect-metadata"
import ISendEmailDTO from '@shared/Container/providers/MailProvider/dtos/ISendEmailDTO'
import IUsersRepository from '../repositories/IUsersRepository'
import {inject,injectable} from 'tsyringe'
import IMailProvider from '@shared/Container/providers/MailProvider/Models/IMailProvider'
import AppError from "@shared/errors/AppError"
import IUsersTokenRepository from '@modules/Users/repositories/IUsersTokenRepository'
import { tokenToString } from "typescript"

interface Request {
    email: string;
}


@injectable()
class SendForgotPasswordEmail {

    constructor(
        @inject('UsersRepository')
        private userRepository:IUsersRepository,
        @inject('MailProvider')
        private mailProvider:IMailProvider,
        @inject('UsersToken')
        private usersToken:IUsersTokenRepository
        ){}


    public async execute ({email}:Request):Promise<void>{
        const user= await this.userRepository.findByEmail(email)

        if(user){
            throw new AppError('não foi possivel enviar o email',403)
        }
        
        const{token}=await this.usersToken.generate(user.id)

        await this.mailProvider.sendEmail({
            to:{
                name:user.name,
                email:user.email,
            },
            subject: '[Gobarber Web] Recuperação de senha',
            templateData:{
                template:'',
                variables:{
                    name:user.name;
                    token,
                }
            }
        })
       
    }
}

export default SendForgotPasswordEmail;