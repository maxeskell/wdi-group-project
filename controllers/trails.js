const Trail = require('../models/trail');

function indexRoute(req, res, next) {
  Trail
    .find(req.query)
    .populate('createdBy')
    .exec()
    .then((trails) => res.json(trails))
    .catch(next);
}

function createRoute(req, res, next) {

  if (req.file) req.body.image = req.file.filename;
  req.body.createdBy = req.user;

  Trail
    .create(req.body)
    .then((trail) => res.status(201).json(trail))
    .catch(next);
}

function updateRoute(req, res, next) {
  if(req.body.route.length === 0 ) req.body.route = req.body.oldRoute;
  if (req.file) req.body.image = req.file.filename;

  req.body.createdBy = req.user.id;


  Trail
    .findById(req.params.id)
    .exec()
    .then((trail) => {
      if (!trail) return res.notFound();

      for (const field in req.body) {
        trail[field] = req.body[field];
      }

      return trail.save();
    })
    .then((trail) => res.json(trail))
    .catch(next);
}

function showRoute(req, res, next) {
  Trail
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((trail) => {
      if (!trail) return res.notFound();

      res.json(trail);
    })
    .catch(next);
}

function deleteRoute(req, res, next) {
  console.log('Arrived in deleteRoute');
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

function addCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Trail
    .findById(req.params.id)
    .exec()
    .then((trail) => {
      if (!trail) return res.notFound();

      const comment = trail.comments.create(req.body);
      trail.comments.push(comment);

      return trail.save()
        .then(() => res.json(comment));
    })
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Trail
    .findById(req.params.id)
    .exec()
    .then((trail) => {
      if (!trail) return res.notFound();

      const comment = trail.comments.id(req.params.commentId);
      comment.remove();

      return trail.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  create: createRoute,
  delete: deleteRoute,
  addComment: addCommentRoute,
  deleteComment: deleteCommentRoute
};
