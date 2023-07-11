require("dotenv").config();

exports.knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: {
    min: 0,
    max: 75,
    destroyTimeoutMillis: 100,
    idleTimeoutMillis: 100,
    reapIntervalMillis: 100,
    createRetryIntervalMillis: 400,
    acquireTimeoutMillis: 10000,
    createTimeoutMillis: 10000,
  },
});
