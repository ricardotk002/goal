var app = angular.module('corona', []);

app.controller('MainController', function($scope, $http) {
    $scope.date = new Date();
    $scope.formData = {};

    $http.get('/api/user/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('error' + data);
        });

    $scope.createTodo = function() {
        $http.post('/api/user/todo', $scope.formData)
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
        $http.delete('/api/user/todo/' + id)
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
        $http.put('/api/user/todo/' + id + '/toggleDone')
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('error' + data);
            });
    }
});