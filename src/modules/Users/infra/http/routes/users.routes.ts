import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload'
import UsersController from '../controllers/UsersControllers'
import Router from 'express'
import UserAvatarController from '../controllers/UserAvatarController'

const usersRouter = Router();
const upload = multer(uploadConfig)
const usersController = new UsersController()
const usersAvatarController = new UserAvatarController()


usersRouter.post('/',usersController.create)

usersRouter.patch('/avatar', ensureAuthenticated,upload.single('avatar'),usersAvatarController.update)


export default usersRouter