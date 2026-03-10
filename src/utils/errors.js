export function createError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export function isDuplicateKeyError(error) {
  return error?.name === "MongoServerError" && error?.code === 11000;
}
