module.exports = {
  github: {
    loginURL: 'https://github.com/login/oauth/authorize',
    accessTokenURL: 'https://github.com/login/oauth/access_token',
    profileURL: 'https://api.github.com/user',
    client_id: process.env.GITHUB_ID_GROUP_PROJECT,
    client_secret: process.env.GITHUB_CLIENT__SECRET_GROUP_PROJECT,
    scope: 'user:email'
  },
  facebook: {
    login_url: 'https://www.facebook.com/v2.9/dialog/oauth',
    client_id: process.env.FB_OAUTH_ID_GROUP_PROJECT,
    client_secret: process.env.FB_OAUTH_SECRET_GROUP_PROJECT,
    accessTokenURL: 'https://graph.facebook.com/v2.9/oauth/access_token',
    redirect_uri: 'http://localhost:7000/',
    scope: 'email'
  }
};
