const cp = require("child_process");

exports.handler = async function () {
  const prismaSchema = "/var/task/prisma/schema.prisma";
  const p = cp.spawnSync(
    "prisma",
    ["migrate", "deploy", "--schema", prismaSchema],
    {
      cwd: process.cwd(),
      env: process.env,
      stdio: "pipe",
      encoding: "utf-8"
    }
  );
  const output = p.error
    ? p.error
    : p.stderr
    ? p.stderr.toString()
    : p.stdout
    ? p.stdout.toString()
    : p.output.join("");
  console.info("---------- MIGRATE OUTPUT ERROR ----------", p.error);
  console.info(
    "---------- MIGRATE OUTPUT STDERR ----------",
    p.stderr ? p.stderr.toString() : null
  );
  console.info("---------- MIGRATE OUTPUT ----------", output);

  return {
    isBase64Encoded: false,
    statusCode: p.error || p.stderr ? 500 : 200,
    headers: { "Content-Type": "text/plain" },
    multiValueHeaders: {},
    body: output
  };
};
