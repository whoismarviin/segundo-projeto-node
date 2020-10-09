import {getRepository,Repository} from 'typeorm'

import ICreateAppointmentDto from '@modules/Appointments/dtos/ICreateAppointmentDto';


import Appointment from '@modules/Appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRespository'
export default class AppointmentsRepository implements IAppointmentsRepository{
    private ormRepository:Repository<Appointment>


    constructor(){
        this.ormRepository =getRepository(Appointment)
    }

    public async findByDate(date:Date): Promise<Appointment | undefined>{
        const findAppointmentinSameDate = this.ormRepository.findOne({
            where:{date}
        })

        return findAppointmentinSameDate;
    }

    public async create ({provider_id,date}:ICreateAppointmentDto):Promise<Appointment>{
        const appointment = this.ormRepository.create({provider_id,date})

        await this.ormRepository.save(appointment)

        return appointment
    }
}
