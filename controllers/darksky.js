const rp = require('request-promise');

function weather(req, res) {
  rp({
    method: 'GET',
    url: `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${req.query.lat},${req.query.lng}`,
    qs: { units: 'si' },
    json: true
  })
  .then((response) => {
    res.status(200).json(response.currently);
  });
}

module.exports = {
  weather
};
