import ICreateAppointmentDto from '../../dtos/ICreateAppointmentDto';
import {isEqual} from 'date-fns'


import Appointment from '@modules/Appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '../IAppointmentsRespository';
import { uuid } from 'uuidv4';

export default class AppointmentsRepository implements IAppointmentsRepository{
    private appointments:Appointment[]=[]


    public async findByDate(date:Date): Promise<Appointment | undefined>{
        const sameAppointment = this.appointments.find(appoointment => isEqual(appoointment.date,date))

        return sameAppointment


    }

    public async create ({provider_id,date}:ICreateAppointmentDto):Promise<Appointment>{
        const appointment = new Appointment();

        Object.assign(appointment, {id: uuid(), date , provider_id});


        return appointment;
    }
}
