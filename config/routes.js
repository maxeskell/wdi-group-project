const router = require('express').Router();


//catch all for errors
router.all('*', (req, res) => res.notFound());

module.exports = router;
