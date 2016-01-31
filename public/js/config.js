angular.module("salesmanGuru")
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

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
                controller: "UserController as user",
                key : true
            }

        )
            .state('salesmen',{
                url: "/salesmen/:uid",
                templateUrl: "../components/salesmen/salesmen.html",
                controller: "salesmenController as salesmen"
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

        $httpProvider.interceptors.push('httpInterceptor');

    })

.run(function($rootScope) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.currentLoginId = localStorage.getItem('key');
            if (toState.key) {
                if ($rootScope.currentLoginId) {
                    console.log("ijaazat hai");
                }
                else {
                    console.log("andar wala");
                    event.preventDefault()
                }
            }
            else {
                console.log("bahar wala");
            }
        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            console.log(unfoundState.to);
            console.log(unfoundState.toParams);
            console.log(unfoundState.options);
        })
    }
)
.factory("httpInterceptor", function(){
    return {
        request : function(config){
            console.log(config);
            var token = localStorage.getItem("key");
            if(token){
                config.url = config.url + "?token="+token;
            }
            return config;
        }
    }
});