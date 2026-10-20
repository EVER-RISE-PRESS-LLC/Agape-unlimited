import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` ADD \`author_type\` text DEFAULT 'Person';`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_author_type\` text DEFAULT 'Person';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`author_type\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_author_type\`;`)
}
