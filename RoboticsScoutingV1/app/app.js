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

app.controller("SlideShowController", function ($scope) {
    $scope.slides = [{
            imageUrl: "../images/doubt.jpg", //adding image once Oscar chooses them
            caption: "caption goes here" //option caption, not sure if we'll use them
    }, {
            imageUrl: "../images/Robotics_logo.jpg",
            caption: "caption goes here"
        //can always add more later
    }];
});
app.directive("slideShow", function () {
    return {
        restrict: 'AE',
        transclude: true,
        scope: {
            slides: '='
        },
        template: `
      <div class="slideshow">
        <ul class="slideshow-slides">
        <li ng-repeat="slide in slides" ng-class="{ active: $index == activeIndex }">
          <figure>
            <img ng-src="{{ slide.imageUrl}}" />
            <figcaption ng-show="slide.caption">{{ slide.caption }}</figcaption>
          </figure>
        </li>
        </ul>
        <ul class="slideshow-dots">
          <li ng-repeat="slide in slides" ng-class="{ active: $index == activeIndex }">
            <a ng-click="jumpToSlide($index)">{{ $index + 1 }}</a>
          </li>
        </ul>
      </div>
    `,
        link: function ($scope, element, attrs) {
            var timer = null;
            $scope.activeIndex = 0;

            $scope.jumpToSlide = function (index) {
                $scope.activeIndex = index;
                restartTimer();
            };

        }
    };

});

var root = document.querySelector('#root');
angular.element(root).ready(function () {
    angular.bootstrap(root, ['app']);
});


