import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositorios/appointmentRepository'
import {startOfHour} from 'date-fns';
import { getCustomRepository} from 'typeorm'
import AppError from '../errors/AppError'

interface Request {
    provider: string;
    date:Date;
}


class CreateAppointmentService {

    public async execute({provider,date}:Request):Promise<Appointment>{
        const appointmentsRepository = getCustomRepository(AppointmentRepository);

        const startedAt = startOfHour(date)

        const findAppointmentInSameDate = await  appointmentsRepository.findByDate(startedAt)
   
        if(findAppointmentInSameDate){
            throw new AppError('Message: This Appointment is already booked',401)
        }
   
        const appointment = appointmentsRepository.create({
            provider,
            date:startedAt
        })

        await appointmentsRepository.save(appointment)

        return appointment;
   
   
    }

}


export default CreateAppointmentService;