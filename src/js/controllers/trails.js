angular
  .module('wildside')
  .controller('TrailsIndexCtrl', TrailsIndexCtrl);

TrailsIndexCtrl.$inject = ['Trail'];

function TrailsIndexCtrl(Trail) {
  const vm = this;

  vm.all = Trail.query();
}
