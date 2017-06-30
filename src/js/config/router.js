angular
  .module('wildside')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/views/static/home.html'
    })
    .state('trailsIndex', {
      url: '/',
      templateUrl: 'js/views/trails/index.html',
      controller: 'TrailsIndexCtrl as trailsIndex'
    });

  $urlRouterProvider.otherwise('/');
}
