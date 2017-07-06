angular
  .module('wildside')
  .controller('RegisterCtrl', RegisterCtrl)
  .controller('LoginCtrl', LoginCtrl);

RegisterCtrl.$inject = ['$auth', '$state', '$scope'];

function RegisterCtrl($auth, $state, $scope) {
  const vm = this;
  vm.user = {};

  $scope.$watch(() => vm.user.password, () => {
    vm.regex = new RegExp(vm.user.password);
  });

  function submit() {
    if (vm.registerForm.$valid) {
      $auth.signup(vm.user)
        .then(() => $state.go('login'))
        .catch(() => $state.go('register'));
    }
  }

  vm.submit = submit;

  function authenticate(provider) {
    $auth.authenticate(provider)
      .then(() => {
        $state.go('trailsIndex');
      });
  }

  vm.authenticate = authenticate;
}

LoginCtrl.$inject = ['$auth', '$state'];

function LoginCtrl($auth, $state) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    // if (vm.loginForm.$valid) {
    $auth.login(vm.credentials)
      .then(() => $state.go('trailsIndex'))
      .catch(() => $state.go('login'));
    // }
  }

  vm.submit = submit;


  function authenticate(provider) {
    $auth.authenticate(provider)
      .then(() => {
        $state.go('trailsIndex');
      });
  }

  vm.authenticate = authenticate;
}
