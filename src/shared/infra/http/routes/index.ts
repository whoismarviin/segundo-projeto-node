import {Router} from 'express';
import appointmentsRouter from '@modules/Appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/Users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/Users/infra/http/routes/session.routes'
import passwordRouter from '@modules/Users/infra/http/routes/password.routes'

const routes= Router();


routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter);
routes.use('/users', sessionsRouter);
routes.use('/users',passwordRouter)

export default routes;