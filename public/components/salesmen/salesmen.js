angular.module('app.salesmen', [])
    .controller('salesmenController', function($mdDialog, $mdMedia,$http,$rootScope) {
        var self = this;
      /*  $http.post("/getsalesmen").then(function(data){
            console.log(data)
        },function(err){
            console.log(err)
        });*/
        self.messages = "";

        $http.post("/getmsg",{company:$rootScope.company}).then(function(data){
            self.messages = data.data;
            console.log(self.messages);
        },function(err){
            console.log(err)
        });




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
