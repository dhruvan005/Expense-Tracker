import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });

async function main() {
    const db = drizzle(migrationClient);

    console.log("Running migrations...");

    await migrate(db, {
        migrationsFolder: "./drizzle"
    });

    console.log("Migrations completed!");

    await migrationClient.end();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});