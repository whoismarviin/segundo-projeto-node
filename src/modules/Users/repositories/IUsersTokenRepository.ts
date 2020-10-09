import UserToken from '@modules/Users/infra/typeorm/entities/UserToken'

export default interface IUsersTokenRepository{
    generate(user_id:string):Promise<UserToken>
    findByToken(token:string):Promise<UserToken | undefined>
}