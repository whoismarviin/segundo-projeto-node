import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { uuid } from "uuidv4";

export class CreateAppointments1599594464814 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [{
                    name: 'id',
                    type: 'uuid',
                    isPrimary:true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'provider',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'date',
                    type: 'Timestamp with time zone',
                    isNullable: false
                }
            
            
            ]
        })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments')
    }

}
