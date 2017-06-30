const router = require('express').Router();
const trails = require('../controllers/trails');


router.route('/trails')
  .get(trails.index);

//catch all for errors
router.all('*', (req, res) => res.notFound());

module.exports = router;
