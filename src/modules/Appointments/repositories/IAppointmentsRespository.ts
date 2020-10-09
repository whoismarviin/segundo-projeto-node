import Appointment from '@modules/Appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDto from '@modules/Appointments/dtos/ICreateAppointmentDto'

export default interface IAppointmentsRepository{    
    findByDate(date:Date): Promise<Appointment | undefined>;
    create(data:ICreateAppointmentDto): Promise<Appointment>
}