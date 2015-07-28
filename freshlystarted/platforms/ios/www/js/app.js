var App = angular.module("App", ["ionic"]);

App.service("FreshlyPressed", ["$http", "$log", FreshlyPressed]);

App.controller("AppCtrl", ["$scope", "FreshlyPressed", "$log", "$ionicGesture", "$window", "$interval", AppCtrl]);

//http://codepen.io/shprink/pen/txliu
//http://codepen.io/calendee/pen/fbEsw

function handleGesture($scope, $ionicGesture, $window, $interval) {
    $scope.lastEventCalled = 'Try to Drag the content up, down, left or rigth';
    var element = angular.element(document.querySelector('#eventPlaceholder'));
    var events = [{
                  event: 'dragup',
                  text: 'You dragged me UP!'
                  },{
                  event: 'dragdown',
                  text: 'You dragged me Down!'
                  },{
                  event: 'dragleft',
                  text: 'You dragged me Left!'
                  },{
                  event: 'dragright',
                  text: 'You dragged me Right!'
                  }];
    
    angular.forEach(events, function(obj){
                    $ionicGesture.on(obj.event, function (event) {
                                     if(obj.event == 'dragup') {
                                     alert("dragup");
                                     }
                                     if(obj.event == 'dragdown') {
                                     alert("dragdown");
                                     }
                                     if(obj.event == 'dragleft') {
                                     alert("dragleft");
                                     }
                                     if(obj.event == 'dragright') {
                                     alert("dragright");
                                     }
                                     
                                     $scope.$apply(function () {
                                                   $scope.lastEventCalled = obj.text;
                                                   });
                                     }, element);
                    });
}

function AppCtrl($scope, FreshlyPressed, $log, $ionicGesture, $window, $interval) {
    handleGesture($scope, $ionicGesture, $window, $interval);
    $scope.posts = [];
    $scope.refresh = function() {
        FreshlyPressed.getBlogs($scope);
    }
}

function FreshlyPressed($http, $log) {
    this.getBlogs = function($scope) {
        $http.jsonp("https://public-api.wordpress.com/rest/v1.1/freshly-pressed?callback=JSON_CALLBACK")
        .success(function(result) {
            $scope.posts = result.posts;
            $log.info(JSON.stringify(result.posts));
        });
    };
}