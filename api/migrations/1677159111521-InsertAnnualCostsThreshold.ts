import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertAnnualCostsThreshold1677159111521
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO annual_costs_threshold VALUES ('HEALTHY', '0', '25'), ('MEDIUM', '25', '75'), ('LOW', '75', 'Infinity')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "DELETE FROM annual_costs_threshold WHERE status = 'HEALTHY' OR status = 'MEDIUM' OR status = 'LOW'",
    );
  }
}
