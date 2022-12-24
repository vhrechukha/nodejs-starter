import type { MigrationInterface, QueryRunner } from 'typeorm';

export class User1671912562704 implements MigrationInterface {
  name = 'User1671912562704';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "externalId" character varying NOT NULL,
                "givenName" character varying NOT NULL,
                "familyName" text,
                "email" character varying NOT NULL,
                "picture" character varying NOT NULL,
                "isActive" boolean NOT NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
