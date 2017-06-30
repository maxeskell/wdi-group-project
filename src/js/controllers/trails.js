angular
  .module('wildside')
  .controller('TrailsIndexCtrl', TrailsIndexCtrl)
  .controller('TrailsShowCtrl', TrailsShowCtrl);

TrailsIndexCtrl.$inject = ['Trail'];

function TrailsIndexCtrl(Trail) {
  const vm = this;

  vm.all = Trail.query();
}


TrailsShowCtrl.$inject = ['Trail', '$state'];

function TrailsShowCtrl(Trail, $state) {
  const vm = this;
  vm.trail = Trail.get($state.params);

  function trailsDelete() {
    vm.trail
      .$remove()
      .then(() => $state.go('trailsIndex'));
  }

  vm.delete = trailsDelete;
}
