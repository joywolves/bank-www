angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, Users) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.login();
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  $scope.logout = function() {
    $scope.account = null;
    $scope.modal.show();
  };
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    primise = Users.login($scope.loginData.username,$scope.loginData.password);
    primise.then(function(data){
      console.log('Doing login back', data);
      if(data.ret == 1){
        $scope.account = data;
        $scope.closeLogin();
      }else{
        $scope.showAlert(JSON.stringify(data.ret));
      }
    });

  };
  $scope.showAlert = function(code) {
   var alertPopup = $ionicPopup.alert({
     title: 'Error username or password!',
     template: 'Please check your username and password . error code:'+code
   });
   alertPopup.then(function(res) {
     console.log('Thank you for checking login');
   });
  };

})

.controller('OrderCtrl', function($scope, Orders) {
  Orders.all().then(function (data) {
    $scope.orders = data;
  });

  $scope.orderRefresh = function() {
    
    console.log('Order Refreshing!');

    Orders.all().then(function (data) {
      $scope.orders = data;
      $scope.$broadcast('scroll.refreshComplete');
    });   
  };
  $scope.update = function(order){
    for (var i=0;i<$scope.orders.length;i++){
      if(order.id == $scope.orders[i].id){
        $scope.orders[i].statue = order.statue;
      }
    }
  }
  $scope.agree = function(order){

    Orders.alt(order.id,1).then(function(data){
      console.log('agree back',data);
      if(data){
        $scope.update(data);
      }
    });
  };
  $scope.reject = function(order){

    Orders.alt(order.id,2).then(function(data){
      console.log('reject back',data);
      if(data){
        $scope.update(data);
      }
    });
  };
})

.controller('UsersCtrl', function($scope, $ionicModal, Users) {
  Users.all().then(function (data) {
    $scope.users = data;
  });

  $ionicModal.fromTemplateUrl('templates/create.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.create = modal;
  });
  
  $scope.createUser = function(u) {       
    u.id = ($scope.users.length + 1).toString() ;
    $scope.users.push(u);
    $scope.create.hide();
  };

  $scope.data = {
    showDelete: false
  };

  $scope.usersRefresh = function() {

    console.log('Users Refreshing!');
    Users.all().then(function (data) {
      $scope.users = data;
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
})

.controller('UserDetailCtrl', function($scope, $stateParams, $ionicHistory, Users) {
  $scope.user = Users.get($stateParams.userId);
  $scope.alt = function (user) {
    console.log("alt",user);
    $ionicHistory.goBack();
  };
})

.controller('AccountCtrl', function($scope) {

});
