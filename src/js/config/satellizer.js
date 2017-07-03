angular
  .module('wildside')
  .config(Auth);

Auth.$inject = ['$authProvider'];

function Auth($authProvider) {
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';
  $authProvider.github({
    url: '/api/oauth/github',
    clientId: 'a28b362fa6f5f3ee2459'
  });

  $authProvider.facebook({
    url: '/api/oauth/facebook',
    clientId: '1209225575853816'
  });
}
