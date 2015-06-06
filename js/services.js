angular.module('starter.services', [])

.factory('Users', function($http,$q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var HOST = "luanhailiang.cn";
  return {
    login: function (account, pass) {
      var deffered = $q.defer();
      $http({
        method:"JSONP",
        url:"http://"+HOST+"/bank/user/login.php?callback=JSON_CALLBACK&account="+account+"&pass="+pass
      }).success(function(data){
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
        url:"http://"+HOST+"/bank/user/all.php?callback=JSON_CALLBACK"
      }).success(function(data){
        deffered.resolve(data);
      }).error(function(){
        deffered.reject("there was an error");
      });
      return deffered.promise;
    },
    get: function(userId) {
      var deffered = $q.defer();
      $http({
        method:"JSONP",
        url:"http://"+HOST+"/bank/user/all.php?callback=JSON_CALLBACK&id="+userId
      }).success(function(data){
        deffered.resolve(data);
      }).error(function(){
        deffered.reject("there was an error");
      });
      return deffered.promise;
    },
    add: function(user){
      var deffered = $q.defer();
      var data = JSON.stringify(user);
      $http({
        method:"JSONP",
        url:"http://"+HOST+"/bank/user/add.php?callback=JSON_CALLBACK&data="+data
      }).success(function(data){
        deffered.resolve(data);
      }).error(function(){
        deffered.reject("there was an error");
      });
      return deffered.promise;
    },
    alt: function(user){
      var deffered = $q.defer();
      var data = JSON.stringify(user);
      $http({
        method:"JSONP",
        url:"http://"+HOST+"/bank/user/alt.php?callback=JSON_CALLBACK&data="+data
      }).success(function(data){
        deffered.resolve(data);
      }).error(function(){
        deffered.reject("there was an error");
      });
      return deffered.promise;
    },
    del: function(id){
      var deffered = $q.defer();
      $http({
        method:"JSONP",
        url:"http://"+HOST+"/bank/user/del.php?callback=JSON_CALLBACK&id="+id
      }).success(function(data){
        deffered.resolve(data);
      }).error(function(){
        deffered.reject("there was an error");
      });
      return deffered.promise;
    }
  };
})
.factory('Orders', function($http,$q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var orders;
  var HOST = "luanhailiang.cn";
  return {
    all: function() {
      var deffered = $q.defer();
      $http({
        method:"JSONP",
        url:"http://"+HOST+"/bank/order/all.php?callback=JSON_CALLBACK"
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
        url:"http://"+HOST+"/bank/order/alt.php?callback=JSON_CALLBACK&id="+orderId+"&statue="+type
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
