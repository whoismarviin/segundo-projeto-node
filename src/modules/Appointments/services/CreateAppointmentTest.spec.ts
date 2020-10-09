import CreateAppointmentService from './CreateAppointmentService'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'


describe('CreateAppointments',()=>{
    it('shoulb be able to create a new appointment',async ()=>{
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointments = new CreateAppointmentService(fakeAppointmentsRepository);


      const appointment= await createAppointments.execute({
            date: new Date(),
            provider: '1228383'
        })

        expect(appointment).toHaveProperty('id')
        expect(appointment.provider_id).toBe('1228383')
    });

    it('should not be able to create to appointments in same date', async ()=>{
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointments = new CreateAppointmentService(fakeAppointmentsRepository);

        const appointmentDate = new Date(2020,4,10,11);


         await createAppointments.execute({
            date: new Date(),
            provider: '1228383'
        })

        expect (createAppointments.execute({
            date: appointmentDate,
            provider: '1228383'
        })).rejects.toBeInstanceOf(Error)
    });
})