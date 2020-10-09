import IMailProvider from '../Models/IMailProvider';
import ISendEmailDTO from '@shared/Container/providers/MailProvider/dtos/ISendEmailDTO'


interface Message {
    to:string;
    body:string
}

export default class FakeEmailProvider implements IMailProvider{
    private messages:ISendEmailDTO[]=[]
    public async sendEmail(message:ISendEmailDTO):Promise<void>{
        this.messages.push(message)
    }
}