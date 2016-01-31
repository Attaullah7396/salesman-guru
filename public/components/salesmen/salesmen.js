angular.module('app.salesmen', [])
    .controller('salesmenController', function($mdDialog, $mdMedia) {
        var self = this;
      /*  $http.post("/getsalesmen").then(function(data){
            console.log(data)
        },function(err){
            console.log(err)
        });*/

        self.showAdvanced = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
                controller: dialogFunc2,
                controllerAs : "dialog",
                templateUrl: 'components/salesmen/dialog2.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };



    });

var dialogFunc2 = function($http,$rootScope,$mdDialog){
    var dial = this;
    dial.user = {};
    dial.user.company = $rootScope.company;
    dial.createSalesmen = function(){
        $http.post("/createsalesmen",dial.user).then(function(data){
            console.log("Salesman created "+ data)
        },function(err){
            console.log("nahe chala 222")
        })
        $mdDialog.hide()
    }
};
