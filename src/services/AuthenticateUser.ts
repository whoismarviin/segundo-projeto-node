import { compare } from 'bcryptjs'
import {getRepository} from 'typeorm'
import User from '../models/User'
import {sign} from 'jsonwebtoken'
import AppError from '../errors/AppError'


interface Request{
    email:string,
    password:string
}

interface Response {
    user:User,
    token:string,
}

class AuthenticateUserService {
    public async execute({email,password}: Request):Promise<Response>{
        const userRepository = getRepository(User)

        const user = await userRepository.findOne({
            where:{email}
        })

        if(!user){
            throw new AppError('Password or Email incorret, try it again',400)
        }

        const passwordMatched = await compare(password,user.password)

     
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