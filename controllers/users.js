const User = require('../models/user');

// show user profile
function userShow(req, res, next) {
  User
    .findById(req.params.id)
    .populate('trailsCompleted')
    .exec()
    .then((user) => {
      if (!user) return res.notFound();

      res.json(user);
    })
    .catch(next);

}

function userUpdate(req, res, next) {
  if(req.file) req.body.image = req.file.key;

  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if (!user) return res.notFound();

      for (const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then((user) => res.json(user))
    .catch(next);
}

function userDelete(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if (!user) return res.notFound();

      return user.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  show: userShow,
  update: userUpdate,
  delete: userDelete
};
