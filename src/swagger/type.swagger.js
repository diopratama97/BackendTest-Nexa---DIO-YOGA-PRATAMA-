const { components } = require("./component.swagger");
const { info } = require("./info.swagger");
const { servers } = require("./server.swagger");

const { login } = require("./docs/auth.docs");
const {
  create,
  list,
  detail,
  update,
  nonactive,
} = require("./docs/employee.docs");

const auth = [];

exports.swaggerDocument = {
  openapi: "3.0.0",
  components,
  info,
  servers,
  paths: {
    "/api/auth/login": {
      post: login(),
    },
    "/api/employee": {
      post: create(auth),
      get: list(auth),
    },
    "/api/employee/{nip}": {
      get: detail(auth),
      put: update(auth),
      delete: nonactive(auth),
    },
  },
};
