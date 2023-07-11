const { components } = require("./component.swagger");
const { info } = require("./info.swagger");
const { servers } = require("./server.swagger");

const { login } = require("./docs/auth.docs");

exports.swaggerDocument = {
  openapi: "3.0.0",
  components,
  info,
  servers,
  paths: {
    "/api/auth/login": {
      post: login(),
    },
  },
};
