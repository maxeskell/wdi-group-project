angular
  .module('wildside')
  .factory('Trail', Trail)
  .factory('TrailComment', TrailComment);

Trail.$inject = ['$resource'];

function Trail($resource) {
  return new $resource('/api/trails/:id', {
    id: '@id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}

TrailComment.$inject = ['$resource'];

function TrailComment($resource) {
  return new $resource('/api/trails/:trailId/comments/:id', {
    id: '@id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}
