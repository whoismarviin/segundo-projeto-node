import User from '@modules/Users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/Users/repositories/IUsersRepository'
import ICreateUserDto from '@modules/Users/dtos/ICreateUserDto'
import { uuid } from 'uuidv4';


class UsersRepository  implements IUsersRepository{

    private users: User[] = []

    public async findById(id:string):Promise<User | undefined>{
        const findUser = this.users.find(user =>  user.id == id)

        return findUser
    }


    public async findByEmail(email:string):Promise<User | undefined>{
        const findUser = this.users.find(user =>  user.email == email)
    
        return findUser
      
    }


    public async create(data:ICreateUserDto):Promise<User>{
        const user = new User();

        Object.assign(user,{id:uuid() },data)

        this.users.push(user)

        return user
    }

    public async save(user:User):Promise<User>{
        const findIndex = this.users.findIndex(findUser => findUser.id ==user.id)


        this.users[findIndex]= user

        return user;

    }




}

export default UsersRepository