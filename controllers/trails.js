const Trail = require('../models/trail');

function indexRoute(req, res, next) {
  Trail
    .find()
    .exec()
    .then((trails) => res.json(trails))
    .catch(next);
}

function createRoute(req, res) {
  Trail.create(req.body.trail, (err, trail) => {
    if (err) return res.status(400).json(err);
    return res.status(201).json(trail);
  });
}

function updateRoute(req, res) {
  Trail.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }, (err, trail) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(trail);
  });
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

function addCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Trail
    .findById(req.params.id)
    .exec()
    .then((post) => {
      if(!post) return res.notFound();

      const comment = post.comments.create(req.body);
      post.comments.push(comment);

      return post.save()
        .then(() => res.json(comment));
    })
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Trail
    .findById(req.params.id)
    .exec()
    .then((post) => {
      if(!post) return res.notFound();

      const comment = post.comments.id(req.params.commentId);
      comment.remove();

      return post.save();
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
