app.controller('myCtrl', function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    //irvins slide show 
    $scope.images = [{
        src: "../images/doubt.jpg", //adding image once Oscar chooses them
        caption: "caption goes here" //option caption, not sure if we'll use them
    }, {
        src: "../images/Robotics_logo.png",
        caption: "caption goes here"
        //can always add more later
    }];
});


/*
This directive allows us to pass a function in on an enter key to do what we want.
 */
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.directive('slideShow', function ($timeout) {
    return {
        restrict: 'AE',
        replace: true,
        $scope: {
            images: '='
        },
        link: function ($scope, elem, attrs) {
            $scope.currentIndex = 0; // Initially the index is at the first image
            //next button
            $scope.next = function () {
                $scope.currentIndex < $scope.images.length - 1 ? $scope.currentIndex++ : $scope.currentIndex = 0;
            };
            //previouse button
            $scope.prev = function () {
                $scope.currentIndex > 0 ? $scope.currentIndex-- : $scope.currentIndex = $scope.images.length - 1;
            };

            $scope.$watch('currentIndex', function () {
                $scope.images.forEach(function (image) {
                    image.visible = false; // make every image invisible
                });

                $scope.images[$scope.currentIndex].visible = true; // make the current image visible
            });
            //auto turn to next image
            var timer;
            var sliderFunc = function () {
                timer = $timeout(function () {
                    $scope.next();
                    timer = $timeout(sliderFunc, 8000);
                }, 8000);
            };

            sliderFunc();

            $scope.$on('$destroy', function () {
                $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
            });
        },
        templateUrl: '../pages/slideshow.html'
    };
});