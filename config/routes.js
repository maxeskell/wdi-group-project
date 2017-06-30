const router = require('express').Router();
const trails = require('../controllers/trails');


router.route('/trails')
  .get(trails.index);

router.route('/posts/:id')
  .get(trails.show)
  .delete(trails.delete);

//catch all for errors
router.all('*', (req, res) => res.notFound());

module.exports = router;
