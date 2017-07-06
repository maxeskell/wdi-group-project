const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const s3 = require('../lib/s3');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    match: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  },
  password: {
    type: String,
    match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  },
  image: {
    type: String
  },
  postcode: {
    type: String,
    trim: true,
    match: /[A-Z]{1,2}[0-9]{1,2}[A-Z]? [0-9][A-Z]{2}/
  },
  trailsCompleted: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Trail'
  }],
  facebookId: {
    type: Number
  },
  githubId: {
    type: Number
  }
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if (!this.image) return null;
    if (this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/wdi27-group-project/${this.image}`;
  });

userSchema.pre('validate', function checkPassword(next) {
  if (!this.password && !this.facebookId && !this.githubId) {
    this.invalidate('password', 'required');
  }
  if (this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema
  .path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });


userSchema.pre('save', function checkPreviousImage(next) {
  if (this.isModified('image') && this._image) {
    return s3.deleteObject({
      Key: this._image
    }, next);
  }
  next();
});

userSchema.pre('remove', function removeImage(next) {
  if (this.image) s3.deleteObject({
    Key: this.image
  }, next);
  next();
});

userSchema.pre('remove', function removeUserTrail(next) {
  this.model('Trail')
    .remove({
      createdBy: this.id
    })
    .then(() => {
      return this.model('Trail').update({
        'comments.createdBy': this.id
      }, {
        $pull: {
          comments: {
            createdBy: this.id
          }
        }
      });
    })
    .then(next)
    .catch(next);
});



module.exports = mongoose.model('User', userSchema);
