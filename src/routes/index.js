"use strict";

const swaggerUi = require("swagger-ui-express");
const { authMiddlewares } = require("../middlewares/auth.middlewares");
const { swaggerDocument } = require("../swagger/type.swagger");
const home = require("../modules/home/handler");
const auth = require("../modules/auth/handler");
const employee = require("../modules/employee/handler");

module.exports = (app) => {
  //home
  app.route("/").get(home.index);

  //auth
  app.route("/api/auth/login").post(auth.login);

  //employe
  app.route("/api/employee").post(authMiddlewares, employee.create);
  app.route("/api/employee").get(authMiddlewares, employee.list);
  app.route("/api/employee/:nip").get(authMiddlewares, employee.detail);
  app.route("/api/employee/:nip").put(authMiddlewares, employee.update);
  app.route("/api/employee/:nip").delete(authMiddlewares, employee.nonactive);

  //swagger
  app.use("/docs-api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
