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
                controller: "SignInController"
            }
        )
            .state('signup', {
                url: "/signup",
                templateUrl: "../components/signup/signup.html",
                controller: "SignUpController"
            }
        );

        $urlRouterProvider.otherwise('/')

    });
