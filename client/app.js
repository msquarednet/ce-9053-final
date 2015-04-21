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
    })
    .when("/games", {
      controller: "GamesController",
      templateUrl: "templates/games.html"
    })
    .when("/teams", {
      controller: "TeamsController",
      templateUrl: "templates/teams.html"
    })    
    .when("/teams/:id", {   // !!!!!!!!
      controller: "TeamsController",
      templateUrl: "templates/teams.html"
    })
  $locationProvider.html5Mode(true);
});



//CONTROLLERS
app.controller("HomeController", function ($scope, NavSvc) {
  $scope.msg = "Okay, then.";
  console.log("HomeController")
  NavSvc.updateTabs();
});
app.controller("TeamsController", function ($scope, NavSvc) {
  console.log("TeamsController")
  NavSvc.updateTabs();
  
});
app.controller("PeopleController", function ($scope, NavSvc) {
  console.log("PeopleController")
  NavSvc.updateTabs();
  
});
app.controller("GamesController", function ($scope, NavSvc) {
  console.log("GamesController")
  NavSvc.updateTabs();
  
});

app.controller("NavigationController", function ($scope, NavSvc) {
  console.log("NavigationController")
  $scope.tabs = NavSvc.tabs;
});




//SERVICES
app.factory("NavSvc", function($location) {
  var _tabs = [
    {label: "Home", path: "/", active:0},
    {label: "Teams", path: "/teams", active:0},
    {label: "People", path: "/people", active:0},
    {label: "Games", path: "/games", active:0}
  ];
  return {
    tabs: _tabs,
    updateTabs: function () {
      _tabs.forEach(function(t){
        var urlpath = $location.path();
        var tabpath = t.path
        //console.log(urlpath+" :: "+tabpath);
        //console.log(urlpath.indexOf(tabpath)+" :: "+urlpath.indexOf(t.label.toLowerCase()))
        //if ($location.path().indexOf(t.path)!=-1) {t.active=1}
        if ($location.path()===t.path) {t.active=1} 
        else {t.active=0;}
      });
      //console.log(_tabs);
    }
  }
});




//DIRECTIVES
app.directive("navigationDirective", function () {
  return {
    restrict: "EA",
    controller: "NavigationController",
    templateUrl: "/templates/nav.html"
  }
});





