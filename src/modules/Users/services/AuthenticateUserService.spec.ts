import AuthenticateUserService from './AuthenticateUser'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '@modules/Users/providers/HashProviders/fakes/FakeHashProvider'



describe('AuthenticateUser', () => {
    it('shoulb be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider()
        const createUser = new CreateUserService(fakeUsersRepository,fakeHashProvider)
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository,fakeHashProvider);

        const usert = await createUser.execute({
            name:'john Doe',
            email: 'jsjsjsj@jmail.com',
            password: '1234'
        })

        const response = await authenticateUser.execute({
            email: 'jsjsjsj@jmail.com',
            password: '1234'
        });

        expect(response).toHaveProperty('token')
        expect(response.user).toEqual('user')


    });


    it('should not be able to authenticate with non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider()
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository,fakeHashProvider);



        expect(authenticateUser.execute({
            email: 'jsjsjsj@jmail.com',
            password: '1234'
        })).rejects.toBeInstanceOf(AppError)



    });

    it('should not be able to authenticate with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider()
        const createUser = new CreateUserService(fakeUsersRepository,fakeHashProvider)
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository,fakeHashProvider);

         await createUser.execute({
            name:'john Doe',
            email: 'jsjsjsj@jmail.com',
            password: '1234'
        })

        expect(await authenticateUser.execute({
            email: 'jsjsjsj@jmail.com',
            password: 'wrong-password'
        })).rejects.toBeInstanceOf(AppError)


    });

    
})