const router = require('express').Router();
const trails = require('../controllers/trails');

router.route('/trails')
  .get(trails.index);

router.route('/trails/:id')
  .get(trails.show)
  .put(trails.update)
  .patch(trails.update)
  .delete(trails.delete);

//catch all for errors
router.all('*', (req, res) => res.notFound());

module.exports = router;
