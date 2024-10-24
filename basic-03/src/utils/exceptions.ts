interface HTTPError extends Error {
  name: "HTTPError";
  statusCode: number;
}

const HTTPError = (message: string, statusCode: number = 500) => {
  const error = new Error(message) as HTTPError;
  error.statusCode = statusCode;
  return error;
};
