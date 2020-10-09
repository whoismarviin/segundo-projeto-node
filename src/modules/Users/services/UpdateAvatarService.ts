import User from '@modules/Users/infra/typeorm/entities/User'
import {getRepository} from 'typeorm'
import {inject,injectable} from 'tsyringe'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'

import IStorageProvider from '@shared/Container/providers/storedProviders/models/IStoredProvider'
interface Request{
    user_id:string;
    avatarFileName: string;
}


@injectable()
class UpdateAvatarService {
    constructor(
        @inject('UsersRepository')
        private userRepository:IUsersRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
        ){}


    public async execute({user_id,avatarFileName}:Request):Promise<User>{
        const userRepository = getRepository(User)

        const user = await userRepository.findOne(user_id)


        if(!user){
            throw new AppError('This user does not exists',400)
        }

        if(user.avatar){
            this.storageProvider.deleteFile(user.avatar)
        }

        const filename = await this.storageProvider.saveFile(avatarFileName)

        user.avatar = filename;

        await this.userRepository.save(user);

        return user;




    }


}
export default UpdateAvatarService;