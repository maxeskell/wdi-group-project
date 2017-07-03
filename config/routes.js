const router = require('express').Router();
const trails = require('../controllers/trails');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const imageUpload = require('../lib/imageUpload');
const secureRoute = require('../lib/secureRoute');

router.route('/trails')
  .get(trails.index)
  .post(secureRoute, imageUpload, trails.create);

router.route('/trails/:id')
  .get(trails.show)
  .put(secureRoute, imageUpload, trails.update)
  .patch(secureRoute, imageUpload, trails.update)
  .delete(secureRoute, trails.delete);

router.route('/users/:id')
  .get(secureRoute, users.show)
  .put(secureRoute, imageUpload, users.update)
  .delete(secureRoute, users.delete);

router.route('/trails/:id/comments')
  .post(secureRoute, trails.addComment);

router.route('/trails/:id/comments/:commentId')
  .delete(trails.deleteComment);

router.route('/register')
  .post(imageUpload, auth.register);

router.route('/login')
  .post(auth.login);

router.route('/oauth/github')
  .post(oauth.github);


//catch all for errors
router.all('*', (req, res) => res.notFound());

module.exports = router;
