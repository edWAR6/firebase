angular.module('promises.controllers', ['promises.services'])

.controller('HomeController', [ '$scope', function($scope) {
	$scope.name = 'Eduardo';

	var reload = function(){
		$scope.name	= '';
	};

	$scope.reload = reload;
}])

.controller('ProductsController', ['$scope', 'Products', function($scope, Products) {
	$scope.products = {};

	$scope.load = function(){
		var promise = Products.list()
		promise.then(function(products){
			$scope.products = products;
			$scope.$apply();
		}, function(error){
			console.error(error);
		});
	};

	$scope.save = function(){
		var product = {
			id: $scope.newproduct.id,
			name: $scope.newproduct.name
		};
		Products.add(product);
	};
}])

.controller('UsersController', ['$scope', 'Users', function($scope, Users) {	
	$scope.users = Users.getUsers;

	Users.addObserver(function(){
		$scope.$apply();
	});
}]);