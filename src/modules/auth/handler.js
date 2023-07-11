const responseHandler = require("../../helpers/responseHandler");
const { knex } = require("../../config/db");
const { login } = require("./schema");
const jwt = require("jsonwebtoken");
const moment = require("moment");

exports.login = async (req, res) => {
  try {
    const { error, value } = login.validate(req.body);
    if (error) {
      return responseHandler.jsonError(res, error.message);
    }

    const checkLogin = await knex("admin")
      .select("id", "username")
      .whereRaw(`password =AES_ENCRYPT('${value.password}', 'nexatest')`)
      .where("username", value.username)
      .first();

    if (!checkLogin) {
      return responseHandler.notFound(res, "User tidak ditemukan!");
    }

    const adminToken = {
      id_admin: checkLogin.id,
      token: jwt.sign({ ...checkLogin }, process.env.SESSION_SECRET),
      expired_at: moment().add(2, "days").format("YYYY-MM-DD HH:mm:ss"),
    };

    await Promise.all([
      knex("admin_token").insert(adminToken),
      knex("log_trx_api").insert({
        user_id: checkLogin.id,
        api: `${req.method}:${req.headers.host}${req.url}`,
        request: JSON.stringify(value),
        response: JSON.stringify({
          message: "Berhasil",
          error: false,
          data: adminToken,
        }),
        insert_at: new Date(),
      }),
    ]);

    return responseHandler.jsonSuccess(res, adminToken, "Berhasil");
  } catch (error) {
    return responseHandler.serverError(res);
  }
};
