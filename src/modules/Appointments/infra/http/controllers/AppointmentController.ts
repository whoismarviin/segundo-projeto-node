import {Request, Response} from 'express'
import {parseISO} from 'date-fns';
import {container} from 'tsyringe'
import CreateAppointmentService from '@modules/Appointments/services/CreateAppointmentService';


export default class AppointmentController {
    public async create(request:Request,response:Response):Promise<Response>{
        const {provider,date}= request.body;

        const parsedDate = parseISO(date)

        const appointmentService = container.resolve(CreateAppointmentService)

        const appointment = await appointmentService.execute({
            provider,
            date:parsedDate
        })
   
   
        return response.json(appointment)
    }
}