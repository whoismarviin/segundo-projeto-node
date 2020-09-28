import {getRepository} from 'typeorm'
import User from '../models/User'
import AppError from '../errors/AppError'

interface Request {
    name:string;
    email: string;
    password:string;
}


class CreateUserService {
    public async execute ({name,email,password}:Request):Promise<User>{
        const userRepository =getRepository(User)

        const findSameEmail = userRepository.findOne({
            where: {email}
        })

        if(findSameEmail) {
            throw new AppError('This email is already used',403)
        }

        const user = userRepository.create({
            name,
            email,
            password
        });

         await userRepository.save(user)

        return user

    }
}

export default CreateUserService;