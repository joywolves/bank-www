angular.module('starter.services', [])

.factory('Users', function($http,$q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var users;
  var account;

  return {
    login: function (account, pass) {
      var deffered = $q.defer();
      $http({
        method:"JSONP",
        url:"http://127.0.0.1/bank/user/login.php?callback=JSON_CALLBACK&account="+account+"&pass="+pass
      }).success(function(data){
        account = data;
        deffered.resolve(data);
      }).error(function(){
        deffered.reject("there was an error");
      });
      return deffered.promise;
    },
    all: function() {
      var deffered = $q.defer();
      $http({
        method:"JSONP",
        url:"http://127.0.0.1/bank/user/all.php?callback=JSON_CALLBACK"
      }).success(function(data){
        users = data;
        deffered.resolve(data);
      }).error(function(){
        deffered.reject("there was an error");
      });
      return deffered.promise;
    },
    get: function(userId) {
      console.log("Users",users,userId);
      for (var i = 0; i < users.length; i++) {
        console.log("Users",users[i].id,userId);
        if (users[i].id === userId) {
          return users[i];
        }
      }
      return null;
    },
    alt: function(user) {
      // body...
    },
    del: function(user){

    }
  };
})
.factory('Orders', function($http,$q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var orders;

  return {
    all: function() {
      var deffered = $q.defer();
      $http({
        method:"JSONP",
        url:"http://127.0.0.1/bank/order/all.php?callback=JSON_CALLBACK"
      }).success(function(data){
        orders = data;
        deffered.resolve(data);
      }).error(function(){
        deffered.reject("there was an error");
      });
      return deffered.promise;
    },
    alt: function (orderId,type) {
      var deffered = $q.defer();
      $http({
        method:"JSONP",
        url:"http://127.0.0.1/bank/order/alt.php?callback=JSON_CALLBACK&id="+orderId+"&statue="+type
      }).success(function(data){
        deffered.resolve(data);
      }).error(function(){
        deffered.reject("there was an error");
      });
      return deffered.promise;
    }
  };
})
;
