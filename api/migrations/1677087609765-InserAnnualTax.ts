import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertAnnualTax1677087609765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO tax VALUES (8, 'ANNUAL_TAX')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        "DELETE FROM tax WHERE name = 'ANNUAL_TAX' AND value = 8",
      );
  }
}
