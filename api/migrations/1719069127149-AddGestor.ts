import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGestor1719069127149 implements MigrationInterface {
    name = 'AddGestor1719069127149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gestor" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "sobreNome" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_5f657627e96ac835c7b4e320884" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "gestor"`);
    }

}
