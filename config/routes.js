const router = require('express').Router();
const trails = require('../controllers/trails');
const auth = require('../controllers/auth');
const imageUpload = require('../lib/imageUpload');
const secureroutes = require('../lib/secureRoute');

router.route('/trails')
  .get(trails.index)
  .post(secureroutes, imageUpload, trails.create);

router.route('/trails/:id')
  .get(trails.show)
  .put(secureroutes, imageUpload, trails.update)
  .patch(secureroutes, imageUpload, trails.update)
  .delete(secureroutes, trails.delete);

router.route('/trails/:id/comments')
  .post(secureroutes, trails.addComment);

router.route('/trails/:id/comments/:commentId')
  .delete(trails.deleteComment);

router.route('/register')
  .post(imageUpload, auth.register);

router.route('/login')
  .post(auth.login);

//catch all for errors
router.all('*', (req, res) => res.notFound());

module.exports = router;
