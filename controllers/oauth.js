const rp = require('request-promise');
const oauth = require('../config/oauth');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {
  secret
} = require('../config/environment');

function github(req, res, next) {
  return rp({
      method: 'POST',
      url: oauth.github.accessTokenURL,
      qs: {
        client_id: oauth.github.clientId,
        client_secret: oauth.github.clientSecret,
        code: req.body.code
      },
      json: true
    })
    .then((token) => {
      return rp({
        method: 'GET',
        url: oauth.github.profileURL,
        qs: token,
        json: true,
        headers: {
          'User-Agent': 'Request-Promise'
        }
      });
    })
    .then((profile) => {
      return User.findOne({
          $or: [{
            facebookId: profile.id
          }, {
            githubId: profile.id
          }, {
            email: profile.email
          }]
        })
        .then((user) => {
          if (!user) {
            user = new User({
              username: profile.login,
              email: profile.email
            });
          }

          user.githubId = profile.id;
          user.image = profile.avatar_url;
          return user.save();
        });
    })
    .then((user) => {
      console.log(user);
      //create a JWT token and send it back to the angular app

      const payload = {
        userId: user.id
      };
      const token = jwt.sign(payload, secret, {
        expiresIn: '1hr'
      });

      return res.json({
        token,
        message: `Welcome back ${user.username}`
      });

    })
    .catch(next);
}

function facebook(req, res, next) {
  return rp({
      method: 'GET',
      url: oauth.facebook.accessTokenURL,
      qs: {
        client_id: oauth.facebook.clientId,
        redirect_uri: oauth.facebook.redirectURL,
        client_secret: oauth.facebook.clientSecret,
        code: req.query.code
      },
      json: true
    })
    .then((token) => {
      return rp({
        method: 'GET',
        url: 'https://graph.facebook.com/v2.5/me?fields=id,name,email,picture.height(961)',
        qs: token,
        json: true

      });
    })
    .then((profile) => {
      return User
        .findOne({
          $or: [{
            facebookId: profile.id
          }, {
            githubId: profile.id
          }, {
            email: profile.email
          }]
        })
        .then((user) => {
          if (!user) {
            user = new User({
              username: profile.name,
              email: profile.email,
              image: profile.picture.data.url
            });
          }
          console.log(profile);

          user.facebookId = profile.id;
          return user.save();
        });
    })
    .then((user) => {
      console.log('*******', user);
      req.session.userId = user.id;
      req.session.isAuthenticated = true;

      req.flash('info', `Welcome back, ${user.username}!`);
      res.redirect('/profile');
    })
    .catch(next);
}




module.exports = {
  github,
  facebook
};
