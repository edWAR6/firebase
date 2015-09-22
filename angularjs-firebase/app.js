angular.module('promises', ['ngRoute', 'promises.controllers', 'firebase', 'promises.services'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.

	when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeController'
	}).
	when('/products', {
    templateUrl: 'views/products.html',
    controller: 'ProductsController'
  }).
  when('/users', {
    templateUrl: 'views/users.html',
    controller: 'UsersController'
  }).
	otherwise({
  	redirectTo: '/'
	});
}]);