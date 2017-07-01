const router = require('express').Router();
const trails = require('../controllers/trails');

router.route('/trails')
.get(trails.index);

router.route('/trails/:id')
.get(trails.show)
.put(trails.update)
.patch(trails.update)
.delete(trails.delete);

router.route('/posts/:id/comments')
.post(trails.addComment);

router.route('/posts/:id/comments/:commentId')
.delete(trails.deleteComment);  

//catch all for errors
router.all('*', (req, res) => res.notFound());

module.exports = router;
