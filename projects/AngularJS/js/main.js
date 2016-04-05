var fApp = angular.module("firstApp",[]);
fApp.controller("firstCtrl",function($scope){
	$scope.firstName = "angularJS";
	$scope.lastName = "用新的属性和表达式扩展了HTML";
	$scope.fullName = function(){
		return $scope.firstName+" "+ $scope.lastName;
	}
});


var fApp1 = angular.module("firstApp1",[]);
fApp1.controller("firstCtrl1",function($scope){
	$scope.firstName1 = "jquery";
	$scope.lastName1 = "操作dom方便，跨浏览器兼容";
});
