import ISendEmailDTO from '@shared/Container/providers/MailProvider/dtos/ISendEmailDTO'


export default interface IMailProvider {
    sendEmail(data:ISendEmailDTO):Promise<void>
}