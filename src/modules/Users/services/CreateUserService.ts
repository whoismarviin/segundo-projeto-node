import "reflect-metadata"
import User from '@modules/Users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import {inject,injectable} from 'tsyringe'
import IHashProvider from '../providers/HashProviders/models/IHashProvider'

interface Request {
    name:string;
    email: string;
    password:string;
}


@injectable()
class CreateUserService {

    constructor(
        @inject('UsersRepository')
        private userRepository:IUsersRepository,
        
        @inject('HashProvider')
        private hashedPassword: IHashProvider,
        ){}

        


    public async execute ({name,email,password}:Request):Promise<User>{
       

        const findSameEmail = this.userRepository.findByEmail(email)


        if(findSameEmail) {
            throw new AppError('This email is already used',403)
        }

        const hashedPassword = await this.hashedPassword.generateHash(password)

        const user = await  this.userRepository.create({
            name,
            email,
            password:hashedPassword,
        });


        return user

    }
}

export default CreateUserService;