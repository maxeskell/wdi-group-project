angular
.module('wildside')
.controller('TrailsIndexCtrl', TrailsIndexCtrl)
.controller('TrailsShowCtrl', TrailsShowCtrl)
.controller('TrailsNewCtrl', TrailsNewCtrl)
.controller('TrailsEditCtrl', TrailsEditCtrl);

TrailsIndexCtrl.$inject = ['Trail'];

function TrailsIndexCtrl(Trail) {
  const vm = this;

  vm.all = Trail.query();

}


TrailsShowCtrl.$inject = ['Trail', '$state', 'TrailComment', 'User', '$auth', '$http'];

function TrailsShowCtrl(Trail, $state, TrailComment, User, $auth, $http) {
  const vm = this;
  vm.newComment = {};
  vm.user = {};

  vm.trail = [];

  Trail.get($state.params)
    .$promise
    .then((data) => {
      vm.trail = data;
      getWeather();
    });

  if ($auth.getPayload()) {
    vm.currentUserId = $auth.getPayload().userId;
    User.get({
      id: vm.currentUserId
    })
    .$promise
    .then((user) => {
      vm.user = user;
      vm.user.trailsCompleted = vm.user.trailsCompleted.map((trail) => trail.id);
    });
  }

  function toggleCompleted() {
    const index = vm.user.trailsCompleted.indexOf(vm.trail.id);
    if (index > -1) {
      vm.user.trailsCompleted.splice(index, 1);
    } else {
      vm.user.trailsCompleted.push(vm.trail.id);
    }
    User
    .update({
      id: vm.user.id
    }, vm.user);
  }

  vm.toggleCompleted = toggleCompleted;

  function isComplete() {
    return $auth.getPayload() && vm.user.$resolved && vm.user.trailsCompleted.includes($state.params.id);
  }

  vm.isComplete = isComplete;

  function trailsDelete() {
    vm.trail
    .$remove()
    .then(() => $state.go('trailsIndex'));
  }

  vm.delete = trailsDelete;

  function addComment() {
    TrailComment
    .save({
      trailId: vm.trail.id
    }, vm.newComment)
    .$promise
    .then((comment) => {
      vm.trail.comments.push(comment);
      vm.newComment = {};
    });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {
    TrailComment
    .delete({
      trailId: vm.trail.id,
      id: comment.id
    })
    .$promise
    .then(() => {
      const index = vm.trail.comments.indexOf(comment);
      vm.trail.comments.splice(index, 1);
    });
  }

  vm.deleteComment = deleteComment;

  function getWeather() {
    const { lat, lng } = vm.trail.route[0];

    $http
      .get('/api/weather', { params: { lat, lng } })
      .then((response) => {
        vm.weather = response.data;
      });

  }
}

TrailsNewCtrl.$inject = ['Trail', '$state', '$scope'];

function TrailsNewCtrl(Trail, $state, $scope) {
  const vm = this;
  vm.trail = { route: [], length: null, time: null  };
  vm.create = trailsCreate;

  $scope.$watch(() => vm.route, () => {
  }, true);
  $scope.$watch(() => vm.length, () => {
  }, true);
  $scope.$watch(() => vm.time, () => {
  }, true);

  console.log(vm.trail);

  function trailsCreate() {
    if (vm.newForm.$valid) {
      Trail
      .save(vm.trail)
      .$promise
      .then(() => $state.go('trailsIndex'));
    }
  }
}


TrailsEditCtrl.$inject = ['$state', 'Trail'];

function TrailsEditCtrl($state, Trail) {
  const vm = this;
  vm.update = trailsUpdate;
  vm.trail ={};

  trailsShow();

  function trailsShow() {


    Trail
    .get($state.params)
    .$promise
    .then((trail) => {
      vm.trail = trail;
      vm.trail.oldRoute = vm.trail.route;
      vm.trail.route = [];

    });
  }

  function trailsUpdate() {
    Trail
    .update($state.params, vm.trail)
    .$promise
    .then(() => {
      $state.go('trailsShow', $state.params);
    });
  }
  
}
