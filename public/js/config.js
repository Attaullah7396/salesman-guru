angular.module("salesmanGuru")
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('home', {
                url: "/",
                templateUrl: "../components/home/home.html",
                controller: "HomeController as home"
            }
        )
            .state('signin', {
                url: "/signin",
                templateUrl: "../components/signin/signin.html",
                controller: "SignInController as signin"
            }
        )
            .state('user', {
                url: "/user/:uid",
                templateUrl: "../components/user/user.html",
                controller: "UserController",
                key : true
            }

        )
            .state('edit', {
                url: "/user/:uid",
                templateUrl: "../components/user/user.html",
                controller: "UserController"
            }

        )
            .state('404', {
                url: "/404",
                templateUrl: "../components/404/404.html"
            });

        $urlRouterProvider.otherwise('/')

    })

.run(function($rootScope){
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.currentLoginEmail = localStorage.getItem('key');
            $rootScope.currentLoginName = localStorage.getItem('name');
            if(toState.key) {
                if($rootScope.currentLoginEmail || $rootScope.currentLoginName){
                    console.log("ijaazat hai");
                }
                else{
                    console.log("andar wala");
                    event.preventDefault()
                }
            }
            else{
                console.log("bahar wala");
               }
           /* else if(toState.key == "signin"){
                if($rootScope.currentLoginEmail){
                    $state.go("/user/"+$rootScope.currentLoginName);
                    //$location.path("/user/"+ $rootScope.currentLoginName);
                    alert($rootScope.currentLoginName)
                }

            }*/
        });


    });
