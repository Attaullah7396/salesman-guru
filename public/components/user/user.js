angular.module('app.user', [])
    .controller('UserController', function($mdDialog, $mdMedia,$http,$location,$rootScope) {
        var self = this;
        $rootScope.currentUser =
        self.companies = "";
        var token = localStorage.getItem("key");
        $http.post("/getcompany",{token:token}).then(function(success){
            self.companies = success.data;
            $rootScope.company = self.companies[0].title;
            $rootScope.async();
            console.log(success)
        },function(err){
            console.log("Network error")
        });

/*
        self.async = function(){
            var ref = new Firebase("https://salesmanguru.firebaseio.com/").child($rootScope.company);
            var ref2 = ref.child("alert");
            alert($rootScope.company);
            $rootScope.order = [];
            ref2.on('child_added', function(message) {
                $rootScope.order.push(message.val().msg);
                alert(message.val().msg);
                $http.post("/message",{msg:message.val().msg,company:$rootScope.company}).then(function(data){
                    console.log(data);
                },function(err){
                    console.log(err)
                })
            });

        };
*/


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
            $location.path("/salesmen/" + $rootScope.company)
        }

    });

var dialogFunc = function($mdDialog,$http,$mdToast,$state,$rootScope) {
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
            $rootScope.company = user.title;
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

