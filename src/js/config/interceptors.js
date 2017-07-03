angular
  .module('wildside')
  .config(Interceptors);

Interceptors.$inject = ['$httpProvider'];

function Interceptors($httpProvider) {
  $httpProvider.interceptors.push('ErrorHandler');
}
