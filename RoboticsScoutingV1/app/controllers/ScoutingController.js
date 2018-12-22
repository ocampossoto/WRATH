app.controller('scout', function ($scope, $http, $mdDialog) {
    $scope.venueList = new Array();
    $scope.status = '  ';
    $scope.customFullscreen = false;
    $scope.loadTeams = function () {
        $http.get('https://localhost:44306/api/2018/').
            then(function (response) {
                console.log(response);
                $scope.venueList = [];
                var venues = response.data;
                for (var i = 0; i < venues.length; i++) {
                    //temp value
                    var temp = venues[i];
                    console.log(temp);
                    $scope.venueList.push(temp);
                }
                $scope.teamid = response.data;
            });
    }
    $scope.sendNew = function (teamData) {
        $http.post('https://localhost:44306/api/2018/', JSON.stringify(teamData));
        $scope.loadTeams();
    }

    $scope.openFromLeft = function (ev) {

        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('Add a new team')
            .textContent('Bowser is a common name.')
            .placeholder('Dog name')
            .ariaLabel('Dog name')
            .initialValue('Buddy')
            .targetEvent(ev)
            .required(true)
            .ok('Okay!')
            .cancel('I\'m a cat person');

        $mdDialog.show(confirm).then(function (result) {
            $scope.status = 'You decided to name your dog ' + result + '.';
        }, function () {
            $scope.status = 'You didn\'t name your dog.';
        });
        //$mdDialog.show(
        //    $mdDialog.alert()
        //        .clickOutsideToClose(true)
        //        .title('Opening from the left')
        //        .textContent('Closing to the right!')
        //        .ariaLabel('Left to right demo')
        //        .ok('Nice!')
        //        // You can specify either sting with query selector
        //        .openFrom(angular.element(document.querySelector('#left')))
        //        // or an element
        //        .closeTo(angular.element(document.querySelector('#right')))
        //);
    };

    $scope.showAdvanced = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/pages/newTeam.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (answer) {
                $scope.sendNew(answer);
                $scope.status = 'You said the information was "' + answer + '".';
               
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function () {
            var newTeamValues = {
                "teamId": document.querySelector('#teamId').value,
                "scale": document.querySelector('#scale').value,
                "exchange": document.querySelector('#scale').value,
                "switch": document.querySelector('#scale').value,
            }
            console.log(newTeamValues, document.querySelector('#teamId').value);
             $mdDialog.hide(newTeamValues.teamId);
        };
    }
    $scope.loadTeams();
});

