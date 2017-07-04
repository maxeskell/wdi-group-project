angular
.module('wildside')
.controller('TrailsIndexCtrl', TrailsIndexCtrl)
.controller('TrailsShowCtrl', TrailsShowCtrl)
.controller('TrailsNewCtrl', TrailsNewCtrl)
.controller('TrailsEditCtrl', TrailsEditCtrl);

TrailsIndexCtrl.$inject = ['Trail'];

function TrailsIndexCtrl(Trail) {
  const vm = this;
  vm.starts = [];

  vm.all = Trail.query((data) => {
    for(let i = 0; i < data.length; i++) {
      vm.starts = vm.starts.concat(data[i].route[0]);
    }
  });

}


TrailsShowCtrl.$inject = ['Trail', '$state', 'TrailComment', 'User', '$auth'];

function TrailsShowCtrl(Trail, $state, TrailComment, User, $auth) {
  const vm = this;
  vm.newComment = {};
  vm.user = {};
  vm.trail = Trail.get($state.params);
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
}

TrailsNewCtrl.$inject = ['Trail', '$state', '$scope'];

function TrailsNewCtrl(Trail, $state, $scope) {
  const vm = this;
  vm.trail = { route: [] };
  vm.create = trailsCreate;

  $scope.$watch(() => vm.route, () => {
    console.log(vm.trail);
  }, true);

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
  vm.trail = {};
  vm.update = trailsUpdate;

  trailsShow();

  function trailsShow() {
    Trail
    .get($state.params)
    .$promise
    .then((trail) => {
      vm.trail = trail;
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
