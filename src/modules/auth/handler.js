const responseHandler = require("../../helpers/responseHandler");
const { knex } = require("../../config/db");
const { login } = require("./schema");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { createLog } = require("../../helpers/logApi");

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
      return responseHandler.notFound(res, "Admin tidak ditemukan!");
    }

    const adminToken = {
      id_admin: checkLogin.id,
      token: jwt.sign({ ...checkLogin }, process.env.SESSION_SECRET),
      expired_at: moment().add(2, "days").format("YYYY-MM-DD HH:mm:ss"),
    };

    await Promise.all([
      knex("admin_token").insert(adminToken),
      createLog(req, value, checkLogin.id, {
        message: "Berhasil",
        error: false,
        data: adminToken,
      }),
    ]);

    return responseHandler.jsonSuccess(res, adminToken, "Berhasil");
  } catch (error) {
    await createLog(req, req.body, null, {
      message: error.message,
      error: true,
      errorDetail: error,
    });
    return responseHandler.serverError(res);
  }
};
