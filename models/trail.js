const mongoose = require('mongoose');
const s3 = require('../lib/s3');

module.exports = mongoose.model('Trail', trailSchema);
