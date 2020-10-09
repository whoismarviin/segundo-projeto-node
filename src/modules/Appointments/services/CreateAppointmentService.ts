import "reflect-metadata"
import Appointment from '@modules/Appointments/infra/typeorm/entities/Appointment'
import {startOfHour} from 'date-fns';
import {inject,injectable} from 'tsyringe'
import AppError from '@shared/errors/AppError'
import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRespository'

interface Request {
    provider: string;
    date:Date;
}


@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentRepository')
        private appointmentsRepository: IAppointmentsRepository
        ){}

    public async execute({provider,date}:Request):Promise<Appointment>{

        const startedAt = startOfHour(date)

        const findAppointmentInSameDate = await  this.appointmentsRepository.findByDate(startedAt)
   
        if(findAppointmentInSameDate){
            throw new AppError('Message: This Appointment is already booked',401)
        }
   
        const appointment = this.appointmentsRepository.create({
            provider_id: provider,
            date:startedAt
        })

        return appointment;
   
   
    }

}


export default CreateAppointmentService;