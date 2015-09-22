angular.module('promises.services', [])

.factory('Products', ['$firebase', function($firebase) {
	var products = {};
	var ref = new Firebase("https://inventorydemo123.firebaseio.com/Products");

	var add = function(product){
		var key = ref.push().key();
		ref.child(key).set(product);
	};

	var list = function(){
		return new Promise(function(success, fail){
			ref.on('value', function(snapshot){
				success(snapshot.val());
			}, function(error){
				fail(error);
			});
		});		
	};

	return {
		add: add,
		list: list
	};
}])

.factory('Users', ['$firebase', function($firebase) {
	var observers = [];
	var users = {};
	var ref = new Firebase("https://inventorydemo123.firebaseio.com/Users");

	ref.on('child_added', function(snapshot){
		users[snapshot.key()] = snapshot.val();
		callObservers();
	});

	ref.on('child_changed', function(snapshot){		
		users[snapshot.key()] = snapshot.val();
		callObservers();
	});

	ref.on('child_removed', function(snapshot){		
		delete users[snapshot.key()];
		callObservers();
	});	

	getUsers = function(){	
		return users;
	};

	addUser = function(user){
		var key = ref.push().key();
		ref.child(key).set(user);
	};	

	var addObserver = function(observer){
		observers.push(observer);
	};

	var callObservers = function(user){		
		angular.forEach(observers, function(callback){
	      	callback(user);
	    });
	};	

	return {
		addObserver: addObserver,		
		getUsers: getUsers
	};
}]);
