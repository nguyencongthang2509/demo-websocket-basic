let myApp = angular.module("myApp", ["ngWebSocket"]);

myApp.controller("myController", function ($scope, $http) {

  $http.get("http://localhost:8080/list").then(function (response) {
    $scope.listProduct = response.data;
  });

  var socket = new SockJS("http://localhost:8080/my-websocket-endpoint");

  var stompClient = Stomp.over(socket);

  stompClient.connect({}, function (frame) {
    console.log("Connected: " + frame);

    stompClient.subscribe("/topic/product", function (message) {
      // console.log(message);

      $scope.listProduct.push(JSON.parse(message.body));
      $scope.$apply();
    });
  });

  $scope.addProduct = function () {
    var message = {
      ma: $scope.ma,
      ten: $scope.ten,
    };

    stompClient.send("/app/products", {}, JSON.stringify(message));
  };
});
