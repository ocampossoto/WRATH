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

var sliderApp = angular.module('sliderApp', ['ngAnimate']);

sliderApp.directive('slider', function ($timeout) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            images: '='
        },
        link: function (scope, elem, attrs) {
            scope.currentIndex = 0; // Initially the index is at the first image

            scope.next = function () {
                scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
            };

            scope.prev = function () {
                scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
            };

            scope.$watch('currentIndex', function () {
                scope.images.forEach(function (image) {
                    image.visible = false; // make every image invisible
                });

                scope.images[scope.currentIndex].visible = true; // make the current image visible
            });
            //auto turn to next image
            var timer;
            var sliderFunc = function () {
                timer = $timeout(function () {
                    scope.next();
                    timer = $timeout(sliderFunc, 6000);
                }, 6000);
            };

            sliderFunc();

            scope.$on('$destroy', function () {
                $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
            });
        },
        templateUrl: 'slideshow.html'
    };
});