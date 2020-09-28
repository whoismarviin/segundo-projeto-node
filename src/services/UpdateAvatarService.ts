import User from '../models/User'
import {getRepository} from 'typeorm'
import path from 'path';
import fs  from 'fs';
import { id } from 'date-fns/locale';
import uploadConfig from '../config/upload'
import AppError from '../errors/AppError'
interface Request{
    user_id:string;
    avatarFileName: string;
}

class UpdateAvatarService {
    public async execute({user_id,avatarFileName}:Request):Promise<User>{
        const userRepository = getRepository(User)

        const user = await userRepository.findOne(user_id)


        if(!user){
            throw new AppError('This user does not exists',400)
        }

        if(user.id){
            const userAvatarFilePath = path.join(uploadConfig.directory,user.avatar)
            const userAvatarFileExists= await fs.promises.stat(userAvatarFilePath);
            
            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarFileName;

        await userRepository.save(user);

        return user;




    }


}
export default UpdateAvatarService;