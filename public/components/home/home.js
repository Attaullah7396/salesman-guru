angular.module('app.home', [])
    .controller('HomeController', function($http,$timeout,$state){

        var self = this;
        self.dataArray = "";
        self.triger1 = false;
        self.triger2 = false;

        self.submitForm = function(){
            if(self.user.pswd == self.cpswd) {
                self.triger1=false;
                self.triger2=true;
                $timeout(function() {
                    self.triger2=false;
                }, 5000);

                $http.post("/signup", self.user).then(function (data) {
                    console.log("Successfully send");
                    console.log(data)
                }, function (err) {
                    console.log(err)
                });

                $state.go("home",{},{reload:true});
                /*self.user.fName = "";
                self.user.lName = "";
                self.user.uName = "";
                self.user.occupation = "";
                self.user.email = "";
                self.user.pswd = "";
                self.cpswd = "";*/

                /* $http.get("/signup").then(function(data){
                 console.log(data)
                 },function(err){
                 console.log(err)
                 });
                 */

            }
            else(
                self.triger1= true
            )


        };


        $http.get("/senddata").then(function(success){
            console.log("No Error in get Request");
            self.dataArray = success.data;

        },function(err){
            console.log("Error in get request")
        })


    });