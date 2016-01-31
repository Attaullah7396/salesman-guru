angular.module('app.user', [])
    .controller('UserController', function($mdDialog, $mdMedia,$http,$location,$rootScope) {
        var self = this;

        self.companies = "";
        var token = localStorage.getItem("key");
        $http.post("/getcompany",{token:token}).then(function(success){
            self.companies = success.data;
            console.log(success)
        },function(err){
            console.log("Network error")
        });

        self.showAdvanced = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
                controller: dialogFunc,
                controllerAs : "dialog",
                templateUrl: 'components/user/dialog1.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };

        self.selectedCompany = function(index){
            $rootScope.company = self.companies[index].title;
            $location.path("/salesmen/" + $rootScope.company)
        }

    });

var dialogFunc = function($mdDialog,$http,$mdToast,$state) {
    var dial=this;
    dial.user = {};
    dial.user.token = localStorage.getItem("key");
    dial.hide = function() {
        $mdDialog.hide();
    };
    dial.cancel = function() {
        $mdDialog.cancel();
    };
    dial.answer = function(answer) {
        $mdDialog.hide(answer);
    };

    dial.createCompany = function(user) {
        $http.post("/company", user).then(function (data) {
            $mdToast.show(
                $mdToast.simple()
                    .content('Company created')
                    .position("top right")
                    .hideDelay(3000)
                    .theme("pink")
            );
            $mdDialog.hide();
            $state.go($state.current,[],{reload:true})
        }, function (err) {
            console.log("nahe chala");
            $mdDialog.hide();

        })




    }

};

