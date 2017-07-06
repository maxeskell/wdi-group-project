const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

const trailSchema = new mongoose.Schema({
  trailName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
  },
  description: {
    type: String,
    required: true,
    trim: true,
    match: /d{1000}/
  },
  difficulty: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  length: {
    type: Number
  },
  time: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  route: [{}],
  comments: [commentSchema],
  trailsCompleted: []
});

trailSchema
  .path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });

trailSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if (!this.image) return null;
    if (this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/wdi27-group-project/${this.image}`;
  });

trailSchema.pre('save', function checkPreviousImage(next) {
  if (this.isModified('image') && this._image) {
    return s3.deleteObject({
      Key: this._image
    }, next);
  }
  next();
});

trailSchema.pre('remove', function removeImage(next) {
  if (this.image) s3.deleteObject({
    Key: this.image
  }, next);
  next();
});

module.exports = mongoose.model('Trail', trailSchema);
