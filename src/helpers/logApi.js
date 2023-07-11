const { knex } = require("../config/db");

exports.createLog = async (req, request, userId, response) => {
  try {
    await knex("log_trx_api").insert({
      user_id: userId,
      api: `${req.method}:${req.headers.host}${req.url}`,
      request: JSON.stringify(request),
      response: JSON.stringify(response),
      insert_at: new Date(),
    });
  } catch (error) {
    throw error;
  }
};
