import { MigrationInterface, QueryRunner } from "typeorm";

export class AddManutencao1718901806213 implements MigrationInterface {
    name = 'AddManutencao1718901806213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "manutencao" ("id" SERIAL NOT NULL, "dataInicio" TIMESTAMP NOT NULL DEFAULT '"2024-06-20T16:43:35.310Z"', "dataFim" TIMESTAMP NOT NULL DEFAULT '"2024-06-20T16:43:35.310Z"', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "veiculoId" integer, CONSTRAINT "PK_abb88f3aa2259355b4612ac07b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "veiculo" ALTER COLUMN "dataAquisicao" SET DEFAULT '"2024-06-20T16:43:35.312Z"'`);
        await queryRunner.query(`ALTER TABLE "manutencao" ADD CONSTRAINT "FK_9913093ce78879ba68df9c3fe65" FOREIGN KEY ("veiculoId") REFERENCES "veiculo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "manutencao" DROP CONSTRAINT "FK_9913093ce78879ba68df9c3fe65"`);
        await queryRunner.query(`ALTER TABLE "veiculo" ALTER COLUMN "dataAquisicao" SET DEFAULT '2024-06-20 16:23:24.491'`);
        await queryRunner.query(`DROP TABLE "manutencao"`);
    }

}
