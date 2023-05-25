import pgp from "pg-promise";

export async function getDb() {
  const cn = {
    host: process.env.POSTGRES_HOST!,
    port: process.env.POSTGRES_PORT!,
    database: process.env.POSTGRES_DB!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,

    // to auto-exit on idle, without having to shut-down the pool;
    // see https://github.com/vitaly-t/pg-promise#library-de-initialization
    allowExitOnIdle: true,
  };

  const db = pgp()(cn as any); // database instance;
  console.log(cn);
  try {
    return await db.connect(); // attempt to connect to the database;
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
}
