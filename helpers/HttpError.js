const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  //   error.message = "missing required name field";
  return error;
};

module.exports = HttpError;
