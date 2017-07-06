function customResponses(req, res, next) {
  res.notFound = function notFound() {
    const err = new Error('Not Found. Sorry we cannot find what you are looking for');
    err.status = 404;

    throw err;
  };

  res.badRequest = function badRequest() {
    const err = new Error(`Bad submission.  Sorry we don't understand the data you are trying to submit`);
    err.status = 400;

    throw err;
  };

  res.unauthorized = function unauthorized() {
    const err = new Error('Credentials not recognised');
    err.status = 401;

    throw err;
  };

  next();
}

module.exports = customResponses;
