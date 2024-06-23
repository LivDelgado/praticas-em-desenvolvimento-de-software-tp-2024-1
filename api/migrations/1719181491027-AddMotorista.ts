import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMotorista1719181491027 implements MigrationInterface {
    name = 'AddMotorista1719181491027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "motorista" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "sobrenome" character varying NOT NULL, "email" character varying NOT NULL, "imagemAvatar" bytea NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ab94c3b7ad53a62d54b775a2a2f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "motorista"`);
    }

}
