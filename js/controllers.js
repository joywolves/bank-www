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
        $scope.showAlert('登录失败','帐号或密码不正确,请重新登录');
      }
    });

  };
  $scope.showAlert = function(title,template) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: template
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
  $scope.showCreateUser = function(){
    $scope.newUser = {};
    $scope.newUser.type = 1;
    $scope.data.showDelete=false;
    $scope.create.show();
  }
  $scope.createUser = function(u) {   
    Users.add(u).then(function (data) {
      console.log("createUser back",data);
      if(data.ret == -1){
        $scope.showAlert('创角失败','帐号名已存在');
        return;
      } 
      if(data.ret == 1){
        $scope.usersRefresh();
      } 
      $scope.create.hide();
    });
  };
  $scope.deleteUser = function(index){
    Users.del($scope.users[index].id).then(function (data) {
      console.log("deleteUser back",data);
      if(data.ret == 1){
        $scope.users.splice(index, 1);
      } 
    });
  }
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
  Users.get($stateParams.userId).then(function (data) {
    $scope.user  = data;
  });
  $scope.alt = function (user) {
    Users.alt(user).then(function (data) {
      console.log("Users alt back",data);
      if(data.ret == -1){
        $scope.showAlert('修改失败','帐号名已存在');
        return;
      } 
      if(data.ret == 1){
        //
      }
    });
    $ionicHistory.goBack();
  };
})

.controller('AccountCtrl', function($scope) {

});
