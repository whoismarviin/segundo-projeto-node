import SendForgotEmailService from './SendForgotEmailService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeEmailProvider from '@shared/Container/providers/MailProvider/fakes/FakeEmailProvider'
import AppError from '@shared/errors/AppError';
import FakeUsersTokenRepository from '@shared/Container/providers/MailProvider/fakes/FakeUserTokensRepository'
import ResetPasswordService from './ResetPasswordService'
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider'


let fakeUsersRepository: FakeUsersRepository;
let fakeEmailProvider:FakeEmailProvider;
let fakeUsersTokensRepository: FakeUsersTokenRepository
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;


describe('ResetPassword', () => {
    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider= new FakeHashProvider();
        fakeEmailProvider = new FakeEmailProvider();
        resetPasswordService= new ResetPasswordService(fakeUsersRepository,fakeUsersTokensRepository,fakeHashProvider)
        fakeUsersTokensRepository= new FakeUsersTokenRepository()

    })


    it('should be able to reset the password', async () => {

        const sendEmail = jest.spyOn(fakeEmailProvider,'sendEmail')


       const user= await fakeUsersRepository.create({
            name:'john Doe',
            email:'johndoe@gmail.com',
            password:'1234'
        })

        const {token} = await fakeUsersTokensRepository.generate(user.id)
        const genetatedHash = jest.spyOn(fakeHashProvider,'generateHash')

        await resetPasswordService.execute({
            password:'123123',
            token
        })

        const updatedUser = await fakeUsersRepository.findById(user.id)

        expect(genetatedHash).toHaveBeenCalledWith('123123')
        expect(updatedUser?.password).toBe('123123')

    });

    it('should not  be able to reset the password with non existing token', async () => {
        
        expect(
            await resetPasswordService.execute({
                password:'123123',
                token:'non'
            })
        ).rejects.toBeInstanceOf(AppError)

    });

    it('should not  be able to reset the password with non existing token', async () => {
        const {token} = await fakeUsersTokensRepository.generate('non-existing')
        
        expect(
            await resetPasswordService.execute({
                password:'123123',
                token
            })
        ).rejects.toBeInstanceOf(AppError)

    });

    
    it('should be able to reset the password', async () => {

       const user= await fakeUsersRepository.create({
            name:'john Doe',
            email:'johndoe@gmail.com',
            password:'1234'
        })

        const {token} = await fakeUsersTokensRepository.generate(user.id)
        
        jest.spyOn(Date,'now').mockImplementationOnce(()=>{
            const customDate = new Date();

            return customDate.setHours(customDate.getHours()+3)
        });

    

        expect( await resetPasswordService.execute({
            password:'123123',
            token
        })).rejects.toBeInstanceOf(AppError)
    });
 
 
 

})