app.controller('scoutApp', function ($scope, $http, $mdDialog, $cookies, $location) {
    $scope.teamTables = [];

    var current_user = $cookies.getObject("current_user");
    $scope.current_user = current_user;
    console.log(current_user);
    $scope.invalid_ePass = true;
    $scope.view = true;
    console.log(current_user);

    //login function to log the user in to the system
    $scope.login_action = function () {
        //login using rest API 
        var url = "https://localhost:44306/api/member/email=" + $scope.email + "&password=" + $scope.password;
        $http.get(url).
            then(function (response) {
                //get the member data
                var member = response.data;
                member.password = ""; //clear password so we don't have it stored in a cookie should be deleted in api anyways
                $cookies.putObject("current_user", member); // save cookie
                // save member info locally
                current_user = member;
                $scope.current_user = member; //save globally
                $scope.f_name = current_user.f_name; //save name
                $scope.l_name = current_user.l_name;
                $scope.team = current_user.teamId; //save team number
                $scope.login = true; //hide login page
                $scope.teamView = false; // show the 
                //check for the user admin rights
                if (current_user.accType) {
                    $scope.viewBtn = "View/Edit";
                }
                else {
                    $scope.viewBtn = "View";
                }
                //get team table data
                $scope.getTeamTables();
                //set cookie for home page
                setState("home");
            }).catch(function () {
                //log errors
                $scope.invalid_ePass = false;
            });
    }
    //log out function 
    $scope.log_out = function () {
        //remove cookies and add login cookie state
        //show the login page.
        $cookies.remove("current_user");
        $scope.login = false;
        $scope.teamView = true;
        setState("login");
    }
    //delete a table function. Prompt to make sure. 
    $scope.delete = function (tableName, ev) {
        var teamId = $scope.team;
        // create dialog with the table name. 
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete the table ' + tableName)
            .textContent('This will delete all the data as well.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes!')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function () {
            //create url string
            var url = "https://localhost:44306/api/scouttable/" + teamId + "/" + tableName;
            $http.delete(url); //delete table 
            //refresh the table list on home page. 
            setTimeout(function () {
                $scope.getTeamTables();
            }, 800);
        }, function () {
            //do nothing canceled.
        });
    }
    //create a new table function
    $scope.create_table = function () {
        //create a dialog to have them enter new table data.
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/pages/newtable.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            fullscreen: true // make as big as possible
        })
            .then(function (answer) {
                //if they answered to create refresh the list
                setTimeout(function () {
                    $scope.getTeamTables();
                }, 500);

            }, function () {
                //do nothing they cancled
            });
    };
    //dialog function 
    function DialogController($scope, $mdDialog) {
        //set up variables
        $scope.colCnt = 0;
        $scope.errors = true;
        //get user info set team number. 
        $scope.current_user = $cookies.getObject("current_user");
        $scope.teamNumber = $scope.current_user.teamId;
        //function to add a new coloumn.
        $scope.addColumn = function () {
            //get the element
            var myElements = angular.element(document.querySelector('#form'));

            if (myElements.length == 0)
                alert("Not found"); //error with finding the form
            else {
                //add a new column for them to enter data
                html =
                    "<td> <label>Name:</label> <br/>  <input type='text' id='Name"
                    + $scope.colCnt + "' /> <br/> <label>Type: </label> <br/>  <select id='Dtype"
                    + $scope.colCnt + "'>  <option value='int'>integer</option>  <option value='string'>string</option>  <option value='bool'>boolean</option>  </select> </td>";
                myElements.append(html);
            }
            //increase col count. 
            $scope.colCnt++;
        }
        //they are done hide and refresh the list
        $scope.hide = function () {
            $mdDialog.hide();
            setTimeout(function () {
                $scope.getTeamTables();
            }, 500);
        };
        //cancled
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        //they answered to add the table. 
        $scope.answer = function () {
            //create variables
            var current_user = $scope.current_user; //get current user
            var DataJson = {}; //object for new table data 
            var teamid = current_user.teamId;
            //get the table name
            var tblName = document.querySelector('#tableName').value + "_" + teamid;
            //add key and values
            DataJson.tblName = tblName;
            DataJson.teamid = teamid;
            //loop through and add all the columns
            for (var i = 0; i < $scope.colCnt; i++) {
                //get the column data
                var nametag = '#Name' + i;
                var typeTag = '#Dtype' + i;
                var name = document.querySelector(nametag).value;
                var type = document.querySelector(typeTag).value;
                //add to json object
                DataJson["col" + i] = { "name": name, "type": type };               
            }
            //console.log(DataJson);
            //post it to database
            $http.post('https://localhost:44306/api/scouttable/',
                JSON.stringify(DataJson),
                { headers: { 'Content-Type': 'application/json' } }
            ).catch(function () {
                //error catch
                $scope.errors = false;
                });
            //hide dialog. 
            $mdDialog.hide();
        };
        
    };

    //Gets the team's scouting tables from get request
    $scope.getTeamTables = function () {
        $scope.teamTables = [];
        var url = "https://localhost:44306/api/scouttable/" + current_user.teamId;
        $http.get(url).
            then(function (response) {
                if (response == null || response == undefined) {
                    console.log("Not found");
                }
                var teamTables = response.data;
                console.log(teamTables);
                for (i = 0; i < teamTables.length; i++) {
                    $scope.teamTables.push(teamTables[i]);
                }

            }).catch(function () {
                $scope.invalid_ePass = false;
            });
    };

    $scope.Load = function (TableName) {
        $scope.login = true;
        $scope.view = false;
        $scope.teamView = true;
        setState("view");
        console.log($scope.login, $scope.view);
    };
    $scope.viewList = function () {
        $scope.login = true;
        $scope.view = true;
        $scope.teamView = false;
        setState("home");
    };

    $scope.pageState = function() {
        var state = $cookies.getObject("state");
        return state;
    };
    function setState(state) {
        $cookies.putObject("state", state);
    };

    if (current_user == null || current_user == undefined) {
        $cookies.remove("current_user");
        $scope.login = false;
        $scope.teamView = true;
        setState("login");
    }
    else {
        $scope.f_name = current_user.f_name;
        $scope.l_name = current_user.l_name;
        $scope.team = current_user.teamId;
        $scope.login = true;
        if (current_user.accType) {
            $scope.viewBtn = "View/Edit";
        }
        else {
            $scope.viewBtn = "View";
        }
        if ($scope.pageState() == "view") {
            $scope.teamView = true;
            $scope.view = false;
        }
       
        
        $scope.getTeamTables();
    }



});