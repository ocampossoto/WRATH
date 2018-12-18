var app = angular.module('myApp', ["ngRoute"]);
//Allows for routing between diffrent pages without reloading the page. 
//html files are just divs with what you want on that page. 
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/pages/home.html"
        })
        .when("/about", {
            templateUrl: "/pages/about.html"
        })
        .when("/contact", {
            templateUrl: "/pages/contact.html"
        })
        .when("/scouting", {
            templateUrl: "/pages/scouting.html"
        });
});

app.controller('myCtrl', function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});

