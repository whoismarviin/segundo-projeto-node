import {request, response, Router} from 'express';
import CreateUserService  from '../services/CreateUserService';
import {hash} from 'bcryptjs'
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload'
import UpdateAvatarService from '../services/UpdateAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig)


usersRouter.post('/',async (request,response)=>{
    try{
        const {name, email,password}=request.body

        const createUser = new CreateUserService();

        const hashedPassword = await hash(password,8)


        const user = await createUser.execute({
            name,
            email,
            password:hashedPassword,
        });


        return response.json(user)

    }catch(err){
        return response.status(400).json({error:err.message})


    }


})

usersRouter.patch('/avatar', ensureAuthenticated,upload.single('avatar'),async (request,response)=>{
    try{
        const updateAvatar = new UpdateAvatarService();

        const user = await updateAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename
        })

        return response.json(user)
    }catch(err){
        throw response.status(400).json({error: err.message})

    }

})


export default usersRouter