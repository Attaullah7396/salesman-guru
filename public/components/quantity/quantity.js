angular.module('app.quantity', [])
    .controller('quantityController', function($http,$rootScope,$mdMedia,$mdDialog) {
        var  self = this;
        self.title = $rootScope.company;
        self.salesmen = "";
        $http.post("/getSalesmen",{company:self.title}).then(function(data){
            console.log(data.data);
            self.salesmen = data.data;
        },function(err){
            console.log(err)
        });

        self.showAdvanced = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
                controller: dialogFunc2,
                controllerAs : "dialog",
                templateUrl: 'components/quantity/dialog2.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };
    });

var dialogFunc2 = function($http,$rootScope,$mdDialog,$state){
    var dial = this;
    dial.user = {};
    dial.user.company = $rootScope.company;
    dial.createSalesmen = function(){
        $http.post("/createsalesmen",dial.user).then(function(data){
            console.log("Salesman created "+ data)
        },function(err){
            console.log("nahe chala 222")
        });
        $mdDialog.hide();
        $state.go($state.current,[],{reload:true})
    }
};

