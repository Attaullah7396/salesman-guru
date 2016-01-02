angular.module('app.signin', [])
    .controller('SignInController', function($mdToast,$http,$state,$timeout,$rootScope,$location) {
        var self = this;
        self.circular = false;
        $rootScope.currentUser = null;

        self.login = function(){
            $http.post("/login", self.user).then(function(data) {
                console.log("Successfully login");
                console.log(data.data);
                if(data.data.email && data.data.pswd){
                    self.circular = true;
                    $timeout(function() {
                        self.circular = false;
                        $rootScope.currentUser = data.data.uName;
                        $mdToast.show(
                            $mdToast.simple()
                                .content('Login Successful, Welcome....')
                                .position("top right")
                                .hideDelay(3000)
                                .theme("success-toast")
                        );
                        $location.path("/user/"+data.data.uName);
                    }, 1500);

                }else{
                    $mdToast.show(
                    $mdToast.simple()
                        .content(data.data)
                        .position("top right")
                        .hideDelay(3000)
                        .theme("success-toast")
                )

                }

            }, function (err) {
                console.log("Connection Problem");
                console.log(err)
            });


        };




    });

