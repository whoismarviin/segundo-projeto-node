import IParseEmailDTO from '../dtos/IParseEmailDTO';
import IMailProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailProvider{
    public async parse({template}:IParseEmailDTO){
        return template

    }
}