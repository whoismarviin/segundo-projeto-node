import User from '@modules/Users/infra/typeorm/entities/User'
import {sign} from 'jsonwebtoken'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import {inject,injectable} from 'tsyringe'
import IHashProvider from '../providers/HashProviders/models/IHashProvider'


interface Request{
    email:string,
    password:string
}

interface Response {
    user:User,
    token:string,
}


@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private userRepository:IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
        ){}


    public async execute({email,password}: Request):Promise<Response>{

        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new AppError('Password or Email incorret, try it again',400)
        }

        const passwordMatched = await this.hashProvider.compareHash(password,user.password)

     
        if(!passwordMatched){
            throw new AppError('Password or Email incorret, try it again',400)
        }

        const token =sign({},'873f7cece2177d4e43d8c9bc94f77e7f',{
            subject: user.id,
            expiresIn: '1d'
        })

        return {
            user,
            token
        }


    }
}


export default AuthenticateUserService