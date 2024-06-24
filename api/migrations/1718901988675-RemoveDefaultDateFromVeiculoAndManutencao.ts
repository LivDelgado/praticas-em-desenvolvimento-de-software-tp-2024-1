import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDefaultDateFromVeiculoAndManutencao1718901988675
  implements MigrationInterface
{
  name = 'RemoveDefaultDateFromVeiculoAndManutencao1718901988675';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "manutencao" ALTER COLUMN "dataInicio" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "manutencao" ALTER COLUMN "dataFim" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "veiculo" ALTER COLUMN "dataAquisicao" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "veiculo" ALTER COLUMN "dataAquisicao" SET DEFAULT '2024-06-20 16:43:35.312'`,
    );
    await queryRunner.query(
      `ALTER TABLE "manutencao" ALTER COLUMN "dataFim" SET DEFAULT '2024-06-20 16:43:35.31'`,
    );
    await queryRunner.query(
      `ALTER TABLE "manutencao" ALTER COLUMN "dataInicio" SET DEFAULT '2024-06-20 16:43:35.31'`,
    );
  }
}
