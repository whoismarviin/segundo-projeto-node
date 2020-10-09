import UpdateUserAvatar from './UpdateAvatarService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError';
import FakeStoredProvider from '@shared/Container/providers/storedProviders/fakes/fakeUpdateUserAvatar'


describe('UpdateUserAvatar', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStoredProvider = new FakeStoredProvider();

        const updateUser = new UpdateUserAvatar(fakeUsersRepository,fakeStoredProvider);

        const user=  await fakeUsersRepository.create({
            name:'john Doe',
            email:'ejejeje@gmail.com',
            password:'123456'
        })

        await updateUser.execute({
            user_id:user.id,
            avatarFileName:'avatar.jpg'
        })

        expect(user.avatar).toBe('avatar.jpg')
    });

    

    it('should not be able to update avatar from a non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStoredProvider = new FakeStoredProvider();

        const updateUser = new UpdateUserAvatar(fakeUsersRepository,fakeStoredProvider);

        expect( await updateUser.execute({
            user_id:'non-existing-avatar',
            avatarFileName:'avatar.jpg'
        })).rejects.toBeInstanceOf(AppError)
    });

    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStoredProvider = new FakeStoredProvider();

        const deleteFile =jest.spyOn(fakeStoredProvider,'deleteFile')

        const updateUser = new UpdateUserAvatar(fakeUsersRepository,fakeStoredProvider);

        const user=  await fakeUsersRepository.create({
            name:'john Doe',
            email:'ejejeje@gmail.com',
            password:'123456'
        })

        await updateUser.execute({
            user_id:user.id,
            avatarFileName:'avatar.jpg'
        })

        await updateUser.execute({
            user_id:user.id,
            avatarFileName:'avatar2.jpg'
        })

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')

        expect(user.avatar).toBe('avatar.jpg')
    });



    





})