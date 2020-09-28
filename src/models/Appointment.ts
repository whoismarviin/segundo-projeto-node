import {Entity,PrimaryGeneratedColumn,Column, ManyToOne, JoinColumn ,CreateDateColumn,
    UpdateDateColumn,} from 'typeorm'


import User from './User';


@Entity("appointments") //ENVIA A CLASS COMO PARAMNETRO PARA ENTIDADE.
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
