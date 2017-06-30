const Trail = require('../models/trail');

function indexRoute(req, res, next) {
  Trail
    .find()
    .exec()
    .then((trails) => res.json(trails))
    .catch(next);
}

function showRoute(req, res, next) {
  Trail
    .findById(req.params.id)
    .exec()
    .then((trail) => {
      if (!trail) return res.notFound();

      res.json(trail);
    })
    .catch(next);
}

function deleteRoute(req, res, next) {
  Trail
    .findById(req.params.id)
    .exec()
    .then((trail) => {
      if (!trail) return res.notFound();

      return trail.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  delete: deleteRoute
};
