import {container} from 'tsyringe'
import '@modules/Users/providers';
import './providers'


import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRespository'
import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentsRepository'

import IUserRepository from '@modules/Users/repositories/IUsersRepository'
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<IAppointmentsRepository>('AppointmentRepository',AppointmentsRepository)


container.registerSingleton<IUserRepository>('UsersRepository',UsersRepository)