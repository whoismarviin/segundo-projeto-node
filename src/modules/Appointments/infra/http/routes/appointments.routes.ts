import {Router} from 'express';

import ensureAunthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated'
import AppointmentController from '../controllers/AppointmentController'


const appointmentsRouter = Router();
const appointmentController = new AppointmentController()


appointmentsRouter.use(ensureAunthenticated);


// appointmentsRouter.get('/',async (request,response)=>{

//     const appointments = await appointmentRepository.find()

//     return response.json(appointments)
// })


appointmentsRouter.post('/',appointmentController.create)

export default appointmentsRouter