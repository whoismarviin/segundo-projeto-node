import {Router} from 'express';
import {parseISO} from 'date-fns';
import AppointmentRepository from '../repositorios/appointmentRepository'
import {getCustomRepository} from 'typeorm'
import AppointmentService from '../services/CreateAppointmentService'
import ensureAunthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAunthenticated);


appointmentsRouter.get('/',async (request,response)=>{
    const appointmentRepository = getCustomRepository(AppointmentRepository)


    const appointments = await appointmentRepository.find()

    return response.json(appointments)
})


appointmentsRouter.post('/',async (request,response)=>{
    try{
        const {provider,date}= request.body;

        const parsedDate = parseISO(date)

        const appointmentService = new AppointmentService()

        const appointment = await appointmentService.execute({
            provider,
            date:parsedDate
        })
   
   
        return response.json(appointment)

    }catch(err){
        return response.status(400).json({error:err.message})


    }


})

export default appointmentsRouter