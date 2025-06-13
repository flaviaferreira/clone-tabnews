import database from "infra/database";

async function cleanupDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

describe("GET - Migrations", () => {
  beforeAll(cleanupDatabase);

  it("GET to /api/v1/migrations should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations");
    expect(response.status).toBe(200);

    console.log("database", process.env.DATABASE_URL);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    const countMigrationsDone = await database.query(
      "SELECT COUNT(*)::int as total FROM pgmigrations;",
    );

    expect(countMigrationsDone[0].total).toBe(0);
  });
});
