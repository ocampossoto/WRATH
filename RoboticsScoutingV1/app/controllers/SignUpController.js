app.controller('signupApp', function ($scope, $http, $cookies, $location) {
    $scope.new_team = true;
    $scope.pass_match = true;
    $scope.pass_status = "Nothing";
    var ctrl = this;
    $scope.password_check = function () {
        $scope.pass_match = false;
        if ($scope.password == $scope.password2) {
            $scope.pass_status = "Passwords Match.";
        }
        else {
            $scope.pass_status = "Passwords Do Not Match!";
        }
    }
    $scope.team_check = function () {
        if ($scope.team_number === null) {
            $scope.new_team = true;
        }
        else {
            var url = "https://localhost:44306/api/team/ " + $scope.team_number;
            $http.get(url).
                then(function (response) {
                    var results = response.data;
                    console.log();
                    if (results.id == 0) {
                        $scope.new_team = false;
                        $scope.admin = true;
                        $scope.team_name = "";
                    }
                    else {
                        console.log(results);
                        $scope.team_name = " That is team: '" + results.team_name + "'";
                        $scope.new_team = true;
                    }
                });
        }
    }
    $scope.create = function () {
        var newMemberValues = {
            "acctype": (document.querySelector('#acc_type').value) ? "true" : "false",
            "f_name": document.querySelector('#f_name').value,
            "l_name": document.querySelector('#l_name').value,
            "email": document.querySelector('#email').value,
            "password": document.querySelector('#pass1').value,
            "teamId": document.querySelector('#team_number').value,
            "approved": (document.querySelector('#acc_type').value) ? "true" : "false"
        }
        console.log(newMemberValues);
        $http.post("https://localhost:44306/api/member/", JSON.stringify(newMemberValues));
        if (!$scope.new_team) {
            var newTeamValues = {
                "number": document.querySelector('#team_number').value,
                "team_name": document.querySelector('#team_name').value,
                "privacy": document.querySelector('#team_privacy').value
            }
            $http.post('https://localhost:44306/api/team/', JSON.stringify(newTeamValues));
        }
        $cookies.putObject
        $cookies.put('f_name', newMemberValues.f_name);
        $cookies.put('l_name', newMemberValues.l_name);
        $location.path('scouting1')
    }
});
