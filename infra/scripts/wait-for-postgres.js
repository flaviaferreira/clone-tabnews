const { exec } = require("node:child_process");

const spinner = ["/", "-", "\\", "|"];
let spinnerIndex = 0;

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(_error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      process.stdout.write(
        `🔴 Postgres is not accepting connections yet. ${spinner[spinnerIndex++ % spinner.length]}`,
      );
      checkPostgres();
      return;
    }

    process.stdout.write(
      "\n🟢 Postgres is running and accepting connections!\n",
    );
  }
}

checkPostgres();
