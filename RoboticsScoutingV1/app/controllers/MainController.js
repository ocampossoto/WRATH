app.controller('myCtrl', function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    //irvins slide show 
    $scope.slides = [{
        imageUrl: "../images/doubt.jpg", //adding image once Oscar chooses them
        caption: "caption goes here" //option caption, not sure if we'll use them
    }, {
        imageUrl: "../images/Robotics_logo.png",
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
        templateUrl: "../pages/slideshow.html",
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