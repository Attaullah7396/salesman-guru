angular.module('app.salesmen', [])
    .controller('salesmenController', function($mdDialog,$http,$rootScope) {
        var self = this;

        $http.post("/getmsg",{company:$rootScope.company}).then(function(data){
            $rootScope.order = data.data;
        },function(err){
            console.log(err)
        });

    });
