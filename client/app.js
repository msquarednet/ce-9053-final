//todo: login
//todo: split-up files (modularize)
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
    .when("/games/edit", {
      controller: "GamesController",
      templateUrl: "templates/games-edit.html"
    })
    .when("/games/edit/:_id", {
      controller: "GamesController",
      templateUrl: "templates/games-edit.html"
    })
    
    .when("/teams", {
      controller: "TeamsController",
      templateUrl: "templates/teams.html"
    })    
    .when("/teams/:_id", {   // !!!!!!!!
      controller: "TeamsController",
      templateUrl: "templates/teams.html"
    })
  $locationProvider.html5Mode(true);
});



//CONTROLLERS
app.controller("HomeController", ["$scope", "NavSvc", function ($scope, NavSvc) {
  $scope.msg = "Okay, then.";
  console.log("HomeController")
  NavSvc.updateTabs();
}]);
app.controller("TeamsController", ["$scope", "NavSvc", function ($scope, NavSvc) {
  console.log("TeamsController")
  NavSvc.updateTabs();
}]);
app.controller("PeopleController", ["$scope", "NavSvc", function ($scope, NavSvc) {
  console.log("PeopleController")
  NavSvc.updateTabs();
}]);
app.controller("GamesController", ["$scope", "NavSvc", "$routeParams", "GamesCRUDSvc", function ($scope, NavSvc, $routeParams, GamesCRUDSvc) {
  console.log("GamesController")
  NavSvc.updateTabs();
  $scope.NavSvc = NavSvc;
  $scope.editnew = ($routeParams._id) ? "Update" : "Insert";
  
  $scope.thegames= [];
  $scope.thegame = {_id:$routeParams._id, name:"", score:0};

  $scope.selectAll = function() {
    GamesCRUDSvc.selectAllGames().then(function(games) {
      $scope.thegames = games;  console.log("Game SELECT ALL probably happened.")
    })
  };
  $scope.select = function() {
    GamesCRUDSvc.selectGame($scope.thegame).then(function(game) {
      $scope.thegame = game;    //console.log("Game SELECT probably happened.")
    })
  };
  $scope.insert = function() {
    GamesCRUDSvc.insertGame($scope.thegame).then(function(game) {
      NavSvc.go("/games");      //console.log("Game INSERT probably happened.")
    })
  };
  $scope.update = function() {
    GamesCRUDSvc.updateGame($scope.thegame).then(function(game) {
      NavSvc.go("/games");      //console.log("Game UPDATE probably happened.")
    })
  };
  $scope.delete = function() {
    GamesCRUDSvc.deleteGame($scope.thegame).then(function(game) {
      NavSvc.go("/games");      //console.log("Game DELETE probably happened.")
    })
  };
  
  if ($routeParams._id) {
    $scope.select();
  } else {
    if (NavSvc.path==="/games") { $scope.selectAll(); }
  }
  
}]);

app.controller("NavigationController", function ($scope, NavSvc) {
  //console.log("NavigationController")
  $scope.tabs = NavSvc.tabs;
});




//SERVICES
app.factory("GamesCRUDSvc", function($http, $q) {
  return {
    selectAllGames: function() {
      var dfd = $q.defer();
      $http.get("/api/games").then(
        function(result) {dfd.resolve(result.data)}, 
        function(result) {dfd.reject (result.data.error)}
      );
      return dfd.promise;
    },
    selectGame: function(game) {
      var dfd = $q.defer();
      $http.get("/api/games/"+game._id).then(
        function(result) {dfd.resolve(result.data)}, 
        function(result) {dfd.reject (result.data.error)}
      );
      return dfd.promise;
    },    
    insertGame: function(game) {
      var dfd = $q.defer();
      $http.post("/api/games", game).then(
        function(result) {dfd.resolve(result.data)}, 
        function(result) {dfd.reject (result.data.error)}
      );
      return dfd.promise;
    },
    updateGame: function(game) {
      var dfd = $q.defer();
      $http.put("/api/games/"+game._id, game).then(
        function(result) {dfd.resolve(result.data)}, 
        function(result) {dfd.reject (result.data.error)}
      );
      return dfd.promise;
    },    
    deleteGame: function(game) {
      var dfd = $q.defer();
      $http.delete("/api/games/"+game._id, game).then(
        function(result) {dfd.resolve(result.data)}, 
        function(result) {dfd.reject (result.data.error)}
      );  
      return dfd.promise;
    }
  }//return
});

app.factory("NavSvc", function($location) {
  var _tabs = [
    {label: "Home", path: "/", active:0},
    {label: "Teams", path: "/teams", active:0},
    {label: "People", path: "/people", active:0},
    {label: "Games", path: "/games", active:0}
  ];
  return {
    tabs: _tabs,
    path: $location.path(),
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
    },
    go: function(path) {
      $location.path(path);
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





