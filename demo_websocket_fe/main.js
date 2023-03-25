let myApp = angular.module("myApp", ["ngWebSocket"]);

myApp.controller("myController", function ($scope, $http) {
  $http.get("http://localhost:8080/list").then(function (response) {
    $scope.listProduct = response.data;
  });

  var socket = new SockJS("http://localhost:8080/my-websocket-endpoint");
  var stompClient = Stomp.over(socket);

  stompClient.connect({}, function (frame) {
    // Kết nối đã được thiết lập thành công
    console.log("Connected: " + frame);
    // Đăng ký để nhận thông báo về sản phẩm mới
    stompClient.subscribe("/topic/product", function (message) {
      // Xử lý thông tin sản phẩm mới
      $http.get("http://localhost:8080/list").then(function (response) {
        $scope.listProduct = response.data;
      });
    });
  });

  // Hàm thêm sản phẩm mới
  $scope.addProduct = function () {
    // Tạo message chứa thông tin sản phẩm mới
    var message = {
      ma: $scope.ma,
      ten: $scope.ten,
    };

    // Gửi message đến server
    stompClient.send("/app/products", {}, JSON.stringify(message));
  };
});
