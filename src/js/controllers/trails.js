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


TrailsShowCtrl.$inject = ['Trail', '$state', 'TrailComment'];

function TrailsShowCtrl(Trail, $state, TrailComment) {
  const vm = this;
  vm.newComment = {};
  vm.trail = Trail.get($state.params);

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
  vm.trail = {};
  vm.create = trailsCreate;
  vm.route = [];

  $scope.$watch(() => vm.route, () => {

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
