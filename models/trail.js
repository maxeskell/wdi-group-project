const mongoose = require('mongoose');
// const s3 = require('../lib/s3');



const trailMapSchema = new mongoose.Schema({
  markers: [{
    lat: { type: Number },
    lng: { type: Number}
  }]
});

const trailSchema = new mongoose.Schema({
  trailName: { type: String, required: true },
  description: { type: String, required: true},
  difficulty: { type: Number, required: true },
  accessibility: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  trail: [ trailMapSchema ]
});

module.exports = mongoose.model('Trail', trailSchema);
