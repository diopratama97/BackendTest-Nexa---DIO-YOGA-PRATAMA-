"use strict";

const swaggerUi = require("swagger-ui-express");
const { authMiddlewares } = require("../middlewares/auth.middlewares");
const home = require("../modules/home/handler");
const auth = require("../modules/auth/handler");
const { swaggerDocument } = require("../swagger/type.swagger");

module.exports = (app) => {
  //home
  app.route("/").get(home.index);

  //auth
  //app.route("/auth/register").post(auth.registrasi);
  app.route("/api/auth/login").post(auth.login);
  //   app.route("/auth/logout").get(auth.Logout);
  //   app.route("/auth/refreshToken").get(auth.tokenRefresh);

  //swagger
  app.use("/docs-api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
