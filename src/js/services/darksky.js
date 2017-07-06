angular
.module('wildside')
.service('darksky', Darksky);

Darksky.$inject = ['$http'];
function Darksky($http) {
  const vm = this;

  function getWeather(lat, lng) {

    return $http
    .get('/api/weather', { params: { lat, lng } })
    .then((response) => {
      return response.data;
    });

  }
  vm.getWeather = getWeather;
}
