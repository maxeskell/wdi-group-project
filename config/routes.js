const router = require('express').Router();
const trails = require('../controllers/trails');
const auth = require('../controllers/auth');
const imageUpload = require('../lib/imageUpload');

router.route('/trails')
  .get(trails.index)
  .post(imageUpload, trails.create);

router.route('/trails/:id')
  .get(trails.show)
  .put(imageUpload, trails.update)
  .patch(imageUpload, trails.update)
  .delete(trails.delete);

router.route('/trails/:id/comments')
  .post(trails.addComment);

router.route('/trails/:id/comments/:commentId')
  .delete(trails.deleteComment);

router.route('/register')
  .post(imageUpload, auth.register);

router.route('/login')
  .post(auth.login);


//catch all for errors
router.all('*', (req, res) => res.notFound());

module.exports = router;
