// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('timerApp', ['ionic', 'angular-svg-round-progressbar'])


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})



app.controller('timerCtrl', function($scope, $timeout){

  $scope.myTimerFixed = 10;
  $scope.myTimer = {}
  $scope.myTimer.value = 10;

  $scope.myTimer.startBtn = false;
  $scope.myTimer.stopBtn = true;

  var svg = document.getElementsByClassName('round-progress')[0]

    svg.onload = function(){
       $scope.radius = svg.getBoundingClientRect().width/2;
    }

  // $scope.radius = 100;

  var myTimerVariable;

  $scope.myCustomTimer = function(){
     $scope.myTimer.value--;

     if($scope.myTimer.value == 0){
        $timeout.cancel(myTimerVariable);
        complete(false)
        return false; 
     }

     myTimerVariable = $timeout($scope.myCustomTimer, 1000)
  }

  $scope.start = function(){
    console.log('started');
    $scope.myTimer.startBtn = true;
    $scope.myTimer.stopBtn = false;
    myTimerVariable = $timeout($scope.myCustomTimer, 1000)
  }

  $scope.stop = function(){
    console.log('Stopped');
    //$scope.myTimer = 10
    $timeout.cancel(myTimerVariable);
    complete(true)
  }

  var complete = function(forcefullAbort){
     if(forcefullAbort){
       alert('You killed the HANAMANT timer');
     }else{
       alert('Timer completed')
     }
     $scope.myTimer.startBtn = false;
     $scope.myTimer.stopBtn = true;
  }

  $scope.getStyle = function(){
    var transform = 'translateY(606%) translateX(45%)';

    return {
        'top':  '50%',
        'bottom': 'auto',
        'left': '500%',
        'transform': transform,
        '-moz-transform': transform,
        '-webkit-transform': transform,
        'font-size': $scope.radius/3.5 + 'px'
    };
};

})