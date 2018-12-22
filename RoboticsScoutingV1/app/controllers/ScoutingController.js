app.controller('scout', function ($scope, $http, $mdDialog) {
    $scope.teamList = new Array();
    $scope.customFullscreen = true;
    $scope.loadTeams = function () {
        $http.get('https://localhost:44306/api/2018/').
            then(function (response) {
                $scope.teamList = [];
                var teams = response.data;
                for (var i = 0; i < teams.length; i++) {
                    var temp = teams[i];
                    $scope.teamList.push(temp);
                }
            });
    }
    $scope.sendNew = function (teamData) {
        $http.post('https://localhost:44306/api/2018/', JSON.stringify(teamData));
        $scope.teamList.push(teamData);
    }

    $scope.openFromLeft = function (id) {
        $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Opening from the left')
                .textContent('Closing to the right!')
                .ariaLabel('Left to right demo')
                .ok('Nice!')
                // You can specify either sting with query selector
                .openFrom(angular.element(document.querySelector('#left')))
                // or an element
                .closeTo(angular.element(document.querySelector('#right')))
        );
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
               // $scope.status = 'You said the information was "' + answer + '".';
               
            }, function () {
               // $scope.status = 'You cancelled the dialog.';
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
                "scale": (document.querySelector('#scale').value === "on") ? "true" : "false",
                "exchange": (document.querySelector('#exchange').value) ? "true" : "false",
                "switch": (document.querySelector('#switch').value) ? "true" : "false",
                "comments": document.querySelector('#comment').value,
                "name": document.querySelector('#name').value
            }
             $mdDialog.hide(newTeamValues);
        };
    }
    $scope.loadTeams();
});

