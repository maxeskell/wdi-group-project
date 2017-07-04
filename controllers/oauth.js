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
        clientId: oauth.github.clientId,
        clientSecret: oauth.github.clientSecret,
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
            githubId: profile.id
          }, {
            facebookId: profile.id
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
      //create a JWT token and send it back to the angular app.
      const payload = {
        userId: user.id
      };
      const token = jwt.sign(payload, secret, {
        expiresIn: '23hr'
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
        client_id: oauth.facebook.client_id,
        redirect_uri: oauth.facebook.redirect_uri,
        client_secret: oauth.facebook.client_secret,
        code: req.body.code
      },
      json: true
    })
    .then((token) => {
      return rp({
        method: 'GET',
        url: 'https://graph.facebook.com/v2.5/me?fields=id,name,email,picture.height(100)',
        qs: token,

        json: true
      });
    })
    .then((profile) => {
      console.log(profile);
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
              username: profile.name,
              email: profile.email
            });
          }
          user.facebookId = profile.id;
          user.image = profile.picture.data.url;
          return user.save();
        });
    })
    .then((user) => {
      console.log(user);
      const payload = {
        userId: user.id
      };
      const token = jwt.sign(payload, secret, {
        expiresIn: '23hr'
      });

      return res.json({
        token,
        message: `Welcome back ${user.username}`
      });
    })
    .catch(next);
}

module.exports = {
  github,
  facebook
};
