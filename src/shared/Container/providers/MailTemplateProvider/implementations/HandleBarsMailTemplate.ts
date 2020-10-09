import handlebars from 'handlebars'

import IParseEmailDTO from '../dtos/IParseEmailDTO';
import IMailProvider from '../models/IMailTemplateProvider';

export default class HandleBarsMailTemplate implements IMailProvider{
    public async parse({template,variables}:IParseEmailDTO):Promise<string>{
        const parseTemplate= handlebars.compile(template);

        return parseTemplate(variables)

    }
}