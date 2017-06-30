const Trail = require('../models/trail');

function indexRoute(req, res, next) {
  Trail
    .find()
    .exec()
    .then((posts) => res.json(posts))
    .catch(next);
}

module.exports = {
  index: indexRoute
};
