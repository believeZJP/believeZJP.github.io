angular.module('starter')
.controller('FeedCtrl',function($scope,$timeout){
	$scope.doRefresh = function(){
		$timeout(function(){
			$scope.$broadcast('scroll.refreshComplete');
		},2000)
	};
});
