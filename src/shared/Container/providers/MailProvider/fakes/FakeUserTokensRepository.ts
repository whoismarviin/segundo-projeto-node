import IUsersRepository from '@modules/Users/repositories/IUsersRepository'
import ICreateUserDto from '@modules/Users/dtos/ICreateUserDto'
import UserToken from '@modules/Users/infra/typeorm/entities/UserToken'
import { uuid } from 'uuidv4';
import IUsersTokenRepository from '@modules/Users/repositories/IUsersTokenRepository'


class FakeUserToken implements IUsersTokenRepository{
    private userTokens:UserToken[]=[]

    public async generate(user_id:string):Promise<UserToken>{
        const userToken = new UserToken();

        Object.assign(userToken,{
            id:uuid(),
            token:uuid(),
            user_id
        });

        this.userTokens.push(userToken)


        return userToken
  
    }

   public async findByToken(token:string):Promise<UserToken | undefined>{
       const userToken = this.userTokens.find(findToken => findToken.token = token)

       return userToken;

   }


}

export default FakeUserToken;