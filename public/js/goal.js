var app = angular.module('goal', []);

app.controller('MainController', function($scope, $http) {
	$scope.date = new Date();
	$scope.formData = {};

	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('error' + data);
		});

	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('error' + data);
			});
	};

	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.formData = {};
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('error' + data);
			});
	};

	$scope.toggleDone = function(id) {
		
	}
});