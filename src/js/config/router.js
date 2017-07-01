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
    .state('trailsNew', {
      url: '/trails/new',
      templateUrl: 'js/views/trails/new.html',
      controller: 'TrailsNewCtrl as trailsNew'
    })
    .state('trailsShow', {
      url: '/trails/:id',
      templateUrl: 'js/views/trails/show.html',
      controller: 'TrailsShowCtrl as trailsShow'
    })
    .state('trailsEdit', {
      url: '/trails/:id/edit',
      templateUrl: '/js/views/trails/edit.html',
      controller: 'TrailsEditCtrl as trailsEdit'
    });

  $urlRouterProvider.otherwise('/');
}
