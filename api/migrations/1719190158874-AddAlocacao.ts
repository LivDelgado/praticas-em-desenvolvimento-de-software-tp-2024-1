import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAlocacao1719190158874 implements MigrationInterface {
  name = 'AddAlocacao1719190158874';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gestor" RENAME COLUMN "sobreNome" TO "sobrenome"`,
    );
    await queryRunner.query(`ALTER TABLE "veiculo" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."veiculo_status_enum"`);
    await queryRunner.query(`ALTER TABLE "motorista" ADD "veiculoId" integer`);
    await queryRunner.query(
      `ALTER TABLE "motorista" ADD CONSTRAINT "UQ_b0494ed2bc7991f482a1d00d94b" UNIQUE ("veiculoId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "motorista" ADD CONSTRAINT "FK_b0494ed2bc7991f482a1d00d94b" FOREIGN KEY ("veiculoId") REFERENCES "veiculo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "motorista" DROP CONSTRAINT "FK_b0494ed2bc7991f482a1d00d94b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "motorista" DROP CONSTRAINT "UQ_b0494ed2bc7991f482a1d00d94b"`,
    );
    await queryRunner.query(`ALTER TABLE "motorista" DROP COLUMN "veiculoId"`);
    await queryRunner.query(
      `CREATE TYPE "public"."veiculo_status_enum" AS ENUM('DISPONÍVEL', 'EM MANUTENÇÃO', 'ALOCADO')`,
    );
    await queryRunner.query(
      `ALTER TABLE "veiculo" ADD "status" "public"."veiculo_status_enum" NOT NULL DEFAULT 'DISPONÍVEL'`,
    );
    await queryRunner.query(
      `ALTER TABLE "gestor" RENAME COLUMN "sobrenome" TO "sobreNome"`,
    );
  }
}
