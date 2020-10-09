import SendForgotEmailService from './SendForgotEmailService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeEmailProvider from '@shared/Container/providers/MailProvider/fakes/FakeEmailProvider'
import AppError from '@shared/errors/AppError';
import FakeUsersTokenRepository from '@shared/Container/providers/MailProvider/fakes/FakeUserTokensRepository'


let fakeUsersRepository: FakeUsersRepository;
let fakeEmailProvider:FakeEmailProvider;
let sendForgotEmailService:SendForgotEmailService
let fakeUsersTokensRepository: FakeUsersTokenRepository


describe('SendForgotPasswordEmail', () => {
    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository();
        fakeEmailProvider = new FakeEmailProvider();
        fakeUsersTokensRepository= new FakeUsersTokenRepository()
        sendForgotEmailService = new SendForgotEmailService(fakeUsersRepository,fakeEmailProvider,fakeUsersTokensRepository);

    })


    it('should be able to recover the password using the email', async () => {
  
        const sendEmail = jest.spyOn(fakeEmailProvider,'sendEmail')


        await fakeUsersRepository.create({
            name:'john Doe',
            email:'johndoe@gmail.com',
            password:'1234'
        })

        await sendForgotEmailService.execute({
            email:'johndoe@gmail.com'
        })

        expect(sendEmail).toHaveBeenCalled()




    });

    it('should not be able to recover a non existing password',async ()=>{


       await expect( sendForgotEmailService.execute({
            email:'johndoe@gmail.com'
        })).rejects.toBeInstanceOf(AppError)

    })

    it('should be able to recover the password using the email', async () => {
        const generatedToken = jest.spyOn(fakeUsersTokensRepository,'generate')


       const user= await fakeUsersRepository.create({
            name:'john Doe',
            email:'johndoe@gmail.com',
            password:'1234'
        })

        await sendForgotEmailService.execute({
            email:'johndoe@gmail.com'
        })

        expect(generatedToken).toHaveBeenCalledWith(user.id)


    });



 

})