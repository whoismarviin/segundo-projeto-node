import {Request,Response} from 'express'
import {container} from 'tsyringe'
import UpdateAvatarService from '../../../services/UpdateAvatarService'


export default class UserAvatarController{
    public async update(request:Request,response:Response):Promise<Response>{
        const updateAvatar = container.resolve(UpdateAvatarService)

        const user = await updateAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename
        })

        return response.json(user)
   

    }
}