import CreateUserService from './CreateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/Users/providers/HashProviders/fakes/FakeHashProvider'


describe('CreateUser', () => {
    it('shoulb be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider()
        const createUser = new CreateUserService(fakeUsersRepository,fakeHashProvider);

        const user = await createUser.execute({
            name: 'john doe',
            email: 'jsjsjsj@jmail.com',
            password: '1234'
        });
        expect(user).toHaveProperty('id')


    });

    it('should not be able to create a new user with same email from another', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider()
        const createUser = new CreateUserService(fakeUsersRepository,fakeHashProvider);

        const user = await createUser.execute({
            name: 'john doe',
            email: 'jsjsjsj@jmail.com',
            password: '1234'
        });

        expect(createUser.execute(user)).rejects.toBeInstanceOf(AppError)


    });

})