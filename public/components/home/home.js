angular.module('app.home', [])
    .controller('HomeController', function($http,$timeout,$state,$mdToast){

        var self = this;
        self.dataArray = "";
        self.circular = false;

        self.checkUname = function(){
          $http.post("/checkUname",{uName:self.user.uName}).then(function(data){
              console.log(data);
              if(data.data == "yes"){
                  $mdToast.show(
                      $mdToast.simple()
                          .content('This Username is already taken')
                          .position("top right")
                          .hideDelay(4500)
                          .theme("red")
                  );
              }
              else{
                  console.log("userName OK")
              }

          },function(err){
                console.log("Nothing")
          })
        };

        self.checkMail = function(){
          $http.post("/checkMail",{email:self.user.email}).then(function(data){
              console.log(data);
              if(data.data == "yes"){
                  $mdToast.show(
                      $mdToast.simple()
                          .content('This Email is already Used')
                          .position("top right")
                          .hideDelay(4500)
                          .theme("red")
                  );
              }
              else{
                  console.log("uEmail ID OK")
              }

          },function(err){
                console.log("Nothing")
          })
        };

        self.submitForm = function(){
            if(self.user.pswd == self.cpswd) {

                $http.post("/user", self.user).then(function (data) {
                    console.log(data);
                    if(data.data.email){
                        self.circular = true;
                        $timeout(function() {
                            self.circular = false;
                            $mdToast.show(
                                $mdToast.simple()
                                    .content('Successfully registered')
                                    .position("top right")
                                    .hideDelay(3000)
                                    .theme("success-toast")
                            );
                            $state.go("signin");
                        }, 1500);


                    }else{
                        $mdToast.show(
                            $mdToast.simple()
                                .content(data.data)
                                .position("top right")
                                .hideDelay(3000)
                                .theme("success-toast")
                        );
                    }
                }, function (err) {
                    console.log("Connection Problem");
                });


            }
            else {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Password does not match')
                        .position("top right")
                        .hideDelay(3000)
                        .theme("success-toast")
                );
            }


        };


        $http.get("/senddata").then(function(success){
            console.log("No Error in get Request");
            self.dataArray = success.data;

        },function(err){
            console.log("Error in get request")
        })


    });