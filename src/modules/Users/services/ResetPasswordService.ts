import "reflect-metadata"
import IUsersRepository from '../repositories/IUsersRepository'
import {inject,injectable} from 'tsyringe'
import IUsersTokenRepository from '@modules/Users/repositories/IUsersTokenRepository'
import AppError from "@shared/errors/AppError"
import IHashProvider from '../providers/HashProviders/models/IHashProvider'
import {isAfter,addHours} from 'date-fns'

interface Request {
    token:string;
    password: string;
}


@injectable()
class ResetPassWord {

    constructor(
        @inject('UsersRepository')
        private userRepository:IUsersRepository,
 
        @inject('UsersToken')
        private usersToken:IUsersTokenRepository,


        @inject('HashProvider')
        private hashProvider:IHashProvider
        ){}

    public async execute ({token,password}:Request):Promise<void>{
        const userToken = await this.usersToken.findByToken(token)

        if(!userToken){
            throw new AppError('Token does not exist',404)
        }

        const user = await this.userRepository.findById(userToken.id)

        if(!user){
            throw new AppError('Token does not exist',404)
        }

        const tokenCreatedAt =userToken.created_at;
        const compareDate = addHours(tokenCreatedAt,2)

        if(isAfter(Date.now(),compareDate)){
            throw new AppError('Token expired',404)
        }




        user.password = await this.hashProvider.generateHash(password);

        await this.userRepository.save(user)

       
    }
}

export default ResetPassWord;