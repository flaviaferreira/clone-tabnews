import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const databaseName = process.env.POSTGRES_DB;
  const openedConnectionsResult = await database.query({
    text: `SELECT COUNT(*)::int AS count FROM pg_stat_activity WHERE datname = $1 and state = 'active';`,
    values: [databaseName],
  });

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionResult[0].server_version,
        max_connections: Number(maxConnectionsResult[0].max_connections),
        opened_connections: openedConnectionsResult[0].count,
      },
    },
  });
}

export default status;
