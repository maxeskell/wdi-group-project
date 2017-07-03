angular
  .module('wildside')
  .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$auth', 'User', '$state'];

function ProfileCtrl($auth, User, $state) {
  const vm = this;


  const {
    userId
  } = $auth.getPayload();

  if (userId) vm.user = User.get({
    id: userId
  });

  vm.logout = logout;

  function logout() {
    $auth.logout(); // remove the token
    $state.go('login'); // send the user to the login state
  }

  function profilesDelete() {
    User
      .remove(vm.user)
      .$promise
      .then(() => {
        $auth.logout();
        $state.go('login');
      });
  }

  vm.delete = profilesDelete;
}
