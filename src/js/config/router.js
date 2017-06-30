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
      url: '/trails',
      templateUrl: 'js/views/trails/index.html',
      controller: 'TrailsIndexCtrl as trailsIndex'
    })
    .state('trailsShow', {
      url: '/trails/:id',
      templateUrl: 'js/views/trails/show.html',
      controller: 'TrailsShowCtrl as trailsShow'
    });

  $urlRouterProvider.otherwise('/');
}
