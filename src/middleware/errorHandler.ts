const ErrorHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  res.send({ error: true, message: error.message || "Internal server error" });
};

export default ErrorHandler;
