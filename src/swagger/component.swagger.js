exports.components = {
  securitySchemes: {
    auth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      in: "header",
    },
  },
};
