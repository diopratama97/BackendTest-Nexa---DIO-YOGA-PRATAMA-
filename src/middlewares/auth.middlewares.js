const { knex } = require("../config/db");
const responseHandler = require("../helpers/responseHandler");

exports.authMiddlewares = async (req, res, next) => {
  try {
    //cek authorization header
    let tokenWithBearer = req.headers.authorization;

    if (tokenWithBearer) {
      let token = tokenWithBearer.split(" ")[1];

      //verifikasi
      const result = await knex("admin_token as at")
        .join("admin as a", "a.id", "at.id_admin")
        .where("at.token", token)
        .andWhere("at.expired_at", ">", new Date())
        .select("a.username", "a.id")
        .first();
      if (!result) {
        return responseHandler.unauthorized(res);
      }
      req.user = result;
      next();
    } else {
      return responseHandler.unauthorized(res, "Token tidak tersedia");
    }
  } catch (error) {
    return responseHandler.serverError(res);
  }
};
