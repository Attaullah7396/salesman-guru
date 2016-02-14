angular.module('salesmanGuru', ['ui.router','ngMaterial','firebase','app.home','app.signin','app.user','app.salesmen','ngMdIcons'])
    .controller('mainController',function($interval,$timeout,$rootScope,$http,$state){

        var self =  this;
        $rootScope.async = function(){
            var ref = new Firebase("https://salesmanguru.firebaseio.com/").child($rootScope.company);
            var ref2 = ref.child("alert");
            $rootScope.order = [];
            ref2.on('child_added', function(message) {
                $rootScope.order.push(message.val().msg);
                console.log(message);
                alert(message.val().msg);
                $http.post("/message",{msg:message.val().msg,company:$rootScope.company}).then(function(data){
                    console.log(data);
                    ref.remove();
                    $state.go($state.current,[],{reload:true})
                },function(err){
                    console.log(err)
                })
            });

        };


/*        self.abc = 5;
        self.show=false;
        self.timer=$interval(function(){
            self.abc += 1;
        },30);

        $timeout(function() {
            $interval.cancel(self.timer);
            self.show=true
        }, 3500);*/
    });
