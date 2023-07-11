const { Router } = require("express");

export const group = (cb) => {
  const route = Router();
  cb(route);
  return route;
};
