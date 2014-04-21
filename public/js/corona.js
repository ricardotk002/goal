var app = angular.module('corona', []);

app.controller('MainController', function($scope, $http, $filter) {
    $scope.todos = [];
    $scope.date = new Date();
    $scope.formData = {};

    $http.get('/api/user/todos')
        .success(function(data) {
            $scope.todos = data;
        })
        .error(function(data) {
            console.log('error' + data);
        });

    $scope.createTodo = function() {
        $http.post('/api/user/todo', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('error' + data);
            });
    };

    $scope.deleteTodo = function(todo_id) {
        $http.delete('/api/user/todo/' + todo_id)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('error' + data);
            });
    };

    $scope.toggleDone = function(todo_id, index) {
        $scope.todos[index].done = !$scope.todos[index].done;
        $http.put('/api/user/todo/' + todo_id + '/toggleDone')
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('error' + data);
            });
    }
});