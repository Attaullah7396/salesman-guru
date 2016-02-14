// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngMaterial','app.home','app.signup','app.signin','app.user'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url: "/",
        templateUrl: "../components/home/home.html",
        controller: "HomeController as home"
      }
    )

      .state('signup',{
        url: "/signup",
        templateUrl: "../components/signup/signup.html",
        controller: "SignUpController as signup"
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

    );

    $urlRouterProvider.otherwise('/');

  });
