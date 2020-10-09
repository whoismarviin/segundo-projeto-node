import IParseEmailDTO from '../dtos/IParseEmailDTO'

export default interface IMailProvider{
    parse(data:IParseEmailDTO):Promise<string>

}