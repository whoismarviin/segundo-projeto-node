import IParseMailTemplateDTO from '@shared/Container/providers/MailTemplateProvider/models/IMailTemplateProvider'


interface IMailContent {
    name:string;
    email:string;
}

export default interface ISendEmailDTO{
    to: IMailContent;
    from?:IMailContent;
    subject: string;
    templateData:IParseMailTemplateDTO
}