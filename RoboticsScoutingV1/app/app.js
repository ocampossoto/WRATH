var app = angular.module('myApp', ["ngRoute", "ngMaterial"]);
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
        .when("/scouting1", {
            templateUrl: "/pages/scouting1.html"
        })
        .when("/scouting", {
            templateUrl: "/pages/scouting.html"
        });
});
//comments mean old code that is due for deletion later on

/////this code has two itterations 12/27/2018 /// delete after next update
//app.controller('myCtrl', function ($scope) {
//    $scope.firstName = "John";
//    $scope.lastName = "Doe";
//});

/////irvins stuff moved to MainController.js 12/27/2018 0 itterations
//app.controller("SlideShowController", function ($scope) {
//    $scope.slides = [{
//            imageUrl: "../images/doubt.jpg", //adding image once Oscar chooses them
//            caption: "caption goes here" //option caption, not sure if we'll use them
//    }, {
//            imageUrl: "../images/Robotics_logo.jpg",
//            caption: "caption goes here"
//        //can always add more later
//    }];
//});
//app.directive("slideShow", function () {
//    return {
//        restrict: 'AE',
//        transclude: true,
//        scope: {
//            slides: '='
//        },
//        templateUrl: "../pages/slideshow.html",
//        link: function ($scope, element, attrs) {
//            var timer = null;
//            $scope.activeIndex = 0;
//            $scope.jumpToSlide = function (index) {
//                $scope.activeIndex = index;
//                restartTimer();
//            };
//        }
//    };
//});
//var root = document.querySelector('#root');
//angular.element(root).ready(function () {
//    angular.bootstrap(root, ['app']);
//});


