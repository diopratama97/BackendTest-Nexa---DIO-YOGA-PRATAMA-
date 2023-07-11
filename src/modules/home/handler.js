"use strict";

const responseHandler = require("../../helpers/responseHandler");
exports.index = (req, res) => {
  return responseHandler.jsonSuccess(res, {}, "Server Oke!");
};
