angular.module('app.signup', [])
  .controller('SignUpController', function($mdToast,$http,$state,$timeout) {
    var self = this;

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


  });

