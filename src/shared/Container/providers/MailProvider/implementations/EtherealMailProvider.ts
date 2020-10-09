import nodemailer, { Transporter } from 'nodemailer'
import IMailProvider from '../Models/IMailProvider';
import ISendEmailDTO from '@shared/Container/providers/MailProvider/dtos/ISendEmailDTO';
import {inject, injectable} from 'tsyringe'
import IMailTemplateProvider from '@shared/Container/providers/MailTemplateProvider/models/IMailTemplateProvider'


@injectable()
export default class EtherealMailProvider implements IMailProvider{
    private client: Transporter

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider:IMailTemplateProvider
    ){
        nodemailer.createTestAccount().then(account =>{
            let transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client= transporter;
        })
    }
    public async sendEmail({to,from,subject}:ISendEmailDTO):Promise<void>{
       const message= await this.client.sendMail({
          from:{
            name: from?.name || 'Equipe Gobarber',
            address:from?.email || 'johndoe@gmail.com'
          }, 
          to:{
              name:to.name,
              address:to.email
          },
          subject,
          text: 'some'
          
        })

  
    
    }
}