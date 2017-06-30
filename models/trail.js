const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const trailSchema = new mongoose.Schema({
  trailName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  trail: []
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
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME_GROUP_PROJECT}/${this.image}`;
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