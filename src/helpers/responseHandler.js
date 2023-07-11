exports.jsonSuccess = (res, data, message) => {
  res.status(200).json({
    message: message || "Success",
    error: false,
    data,
  });
};

exports.jsonError = (res, message) => {
  res.status(200).json({
    message: message || "Success with warning",
    error: true,
  });
};

exports.unauthorized = (res, message) => {
  res.status(401).json({
    message: message || "Unathorized",
    error: true,
  });
};

exports.notFound = (res, message) => {
  res.status(404).json({
    message: message || "Not found",
    error: true,
  });
};

exports.serverError = (res, message) => {
  res.status(500).json({
    message: message || "Error Server",
    error: true,
  });
};

exports.badRequest = (res, message) => {
  res.status(400).json({
    message: message || "Bad Request",
    error: true,
  });
};

exports.forbidden = (res, message) => {
  res.status(403).json({
    message: message || "Forbidden",
    error: true,
  });
};

exports.duplicated = (res, message) => {
  res.status(409).json({
    message: message || "Duplicate",
    error: true,
  });
};
