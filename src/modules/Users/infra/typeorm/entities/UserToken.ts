import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,Generated} from 'typeorm';


@Entity('users') //ENVIA A CLASS COMO PARAMNETRO PARA ENTIDADE.
class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    token:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default UserToken;