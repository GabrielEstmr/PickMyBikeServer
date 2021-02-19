import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSales1613608621015 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'sales',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'provider_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey('sales', new TableForeignKey({
            name: 'salesProvider',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('sales');
    }

}


//cascate delete: isnulable:true > se prestador de serviços sair: appointments continua
//onDelete: 'RESTRICT', 'SET NULL', 'CASCATE'

// onUpdate: 'CASCATE', > sempre pois se mudar id muda em tudo