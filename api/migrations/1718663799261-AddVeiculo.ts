import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVeiculo1718663799261 implements MigrationInterface {
  name = 'AddVeiculo1718663799261';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."veiculo_status_enum" AS ENUM('DISPONÍVEL', 'EM MANUTENÇÃO', 'ALOCADO')`,
    );
    await queryRunner.query(
      `CREATE TABLE "veiculo" ("id" SERIAL NOT NULL, "montadora" character varying NOT NULL, "modelo" character varying NOT NULL, "ano" character varying(4) NOT NULL, "status" "public"."veiculo_status_enum" NOT NULL DEFAULT 'DISPONÍVEL', "dataAquisicao" TIMESTAMP NOT NULL DEFAULT '"2024-06-17T22:36:48.074Z"', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0fcc9d29b16ed347447f8f9356e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "veiculo"`);
    await queryRunner.query(`DROP TYPE "public"."veiculo_status_enum"`);
  }
}
