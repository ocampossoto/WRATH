app.controller('scoutApp', function ($scope, $http, $mdDialog, $cookies, $location) {
    var ctrl = this;
    ctrl.f_name = $cookies.get("f_name");
    ctrl.l_name = $cookies.get("l_name");
    if (ctrl.f_name == null || ctrl.l_name == null || ctrl.f_name == undefined || ctrl.l_name == undefined) {
        $cookies.remove("f_name");
        $cookies.remove("l_name");
        $scope.login = false;
        
    }
    else {
        $scope.f_name = ctrl.f_name;
        $scope.l_name = ctrl.l_name;
        $scope.login = true;
    }
    $scope.login_action = function () {
        var url = "https://localhost:44306/api/member/email=" + $scope.email + "&password=" + $scope.password;
        $http.get(url).
            then(function (response) {
                if (response == null || response == undefined) {
                    console.log("Not found");
                }
                var member = response.data;
                $cookies.put('f_name', member.f_Name);
                $cookies.put('l_name', member.l_Name);
                $scope.f_name = member.f_Name;
                $scope.l_name = member.l_Name;
                $scope.login = true;
            });
    }
    $scope.log_out = function () {
        $cookies.remove("f_name");
        $cookies.remove("l_name");
        $scope.login = false;
    }
    
    //$scope.GetCook = function($scope, $cookies, $cookieStore) {
    //    var someSessionObj = { 'innerObj': 'somesessioncookievalue' };

    //    $cookies.dotobject = someSessionObj;
    //    $scope.usingCookies = { 'cookies.dotobject': $cookies.dotobject, "cookieStore.get": $cookieStore.get('dotobject') };

    //    $cookieStore.put('obj', someSessionObj);
    //    $scope.usingCookieStore = { "cookieStore.get": $cookieStore.get('obj'), 'cookies.dotobject': $cookies.obj, };
    //}
    //$scope.teamList = new Array();
    //$scope.customFullscreen = true;
    //$scope.loadTeams = function () {
    //    $http.get('https://localhost:44306/api/2018/').
    //        then(function (response) {
    //            $scope.teamList = [];
    //            var teams = response.data;
    //            for (var i = 0; i < teams.length; i++) {
    //                var temp = teams[i];
    //                $scope.teamList.push(temp);
    //            }
    //        });
    //}
    //$scope.sendNew = function (teamData) {
    //    $http.post('https://localhost:44306/api/2018/', JSON.stringify(teamData));
    //    $scope.teamList.push(teamData);
    //}

    //$scope.openFromLeft = function (id) {
    //    $mdDialog.show(
    //        $mdDialog.alert()
    //            .clickOutsideToClose(true)
    //            .title('Opening from the left')
    //            .textContent('Closing to the right!')
    //            .ariaLabel('Left to right demo')
    //            .ok('Nice!')
    //            // You can specify either sting with query selector
    //            .openFrom(angular.element(document.querySelector('#left')))
    //            // or an element
    //            .closeTo(angular.element(document.querySelector('#right')))
    //    );
    //};



    //function DialogController($scope, $mdDialog) {
    //    $scope.hide = function () {
    //        $mdDialog.hide();
    //    };

    //    $scope.cancel = function () {
    //        $mdDialog.cancel();
    //    };

    //    $scope.answer = function () {
    //        var newTeamValues = {
    //            "teamId": document.querySelector('#teamId').value,
    //            "scale": (document.querySelector('#scale').value === "on") ? "true" : "false",
    //            "exchange": (document.querySelector('#exchange').value) ? "true" : "false",
    //            "switch": (document.querySelector('#switch').value) ? "true" : "false",
    //            "comments": document.querySelector('#comment').value,
    //            "name": document.querySelector('#name').value
    //        }
    //         $mdDialog.hide(newTeamValues);
    //    };
    //}
    //$scope.loadTeams();
});



