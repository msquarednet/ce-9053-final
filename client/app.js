//CONFIG
var app = angular.module("BotaApp", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
      controller: "HomeController",
      templateUrl: "templates/home.html"
    })
    .when("/people", {
      controller: "PeopleController",
      templateUrl: "templates/people.html"
    });
  $locationProvider.html5Mode(true);
});



//SERVICES



//CONTROLLERS
app.controller("HomeController", function ($scope) {
  $scope.msg = "Okay, then.";
});
app.controller("PeopleController", function ($scope) {
  
});



//DIRECTIVES






