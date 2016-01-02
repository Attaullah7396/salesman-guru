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
                controller: "UserController"
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

    });
