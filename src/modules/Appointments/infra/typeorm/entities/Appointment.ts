import {Entity,PrimaryGeneratedColumn,Column, ManyToOne, JoinColumn ,CreateDateColumn,
    UpdateDateColumn,} from 'typeorm'


import User from '@modules/Users/infra/typeorm/entities/User';


@Entity("appointments") //ENVIA A CLASSE COMO PARAMETRO PARA ENTIDADE.
class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "provider_id" })
  provider:User;

  @Column("timestamp with time zone")
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Appointment;
