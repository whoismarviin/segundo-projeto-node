import User from '@modules/Users/infra/typeorm/entities/User';
import {getRepository,Repository} from 'typeorm'
import IUsersRepository from '@modules/Users/repositories/IUsersRepository'
import ICreateUserDto from '@modules/Users/dtos/ICreateUserDto'


class UsersRepository  implements IUsersRepository{

    private ormRepository: Repository<User>

    constructor(){
        this.ormRepository = getRepository(User);

    }

    public async findById(id:string):Promise<User | undefined>{
        const user = await this.ormRepository.findOne(id)

        return user
    }


    public async findByEmail(email:string):Promise<User | undefined>{
        const user = this.ormRepository.findOne({
            where: {email}
        })

        return user
      
    }


    public async create(data:ICreateUserDto):Promise<User>{
        const User = this.ormRepository.create(data)

        await this.ormRepository.save(User);

        return User
    }

    public async save(user:User):Promise<User>{
        return this.ormRepository.save(user);
    }




}

export default UsersRepository