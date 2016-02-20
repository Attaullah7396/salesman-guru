angular.module('salesmanGuru', ['ui.router','ngMaterial','leaflet-directive','firebase','app.home','app.signin','app.user','app.salesmen','app.location','app.quantity','ngMdIcons'])
    .controller('mainController',function($interval,$timeout,$rootScope,$http,$state,$mdToast){

        var self =  this;
        $rootScope.order = [];
        $rootScope.async = function(){
            var ref = new Firebase("https://salesmanguru.firebaseio.com/").child($rootScope.company);
            var ref2 = ref.child("alert");
            ref2.on('child_added', function(message) {
                $rootScope.order.push(message.val());
                console.log(message.val());
                $mdToast.show(
                    $mdToast.simple()
                        .content('New message received')
                        .position("top right")
                        .hideDelay(3000)
                        .theme("pink")
                );
                ref.remove();
            });

        };

        self.signin = function(){
            $state.go("signin");
        };

        self.logOut = function(){
            localStorage.removeItem("key");
            localStorage.removeItem("name");
            $rootScope.login = false;
            $state.go("home");
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
