var app = angular.module('corona', []);

app.controller('MainController', function($scope, $http, $filter) {
    $scope.todos = [];
    $scope.editedTodo = null;
    $scope.formData = {};

    $http.get('/api/user/todos')
        .success(function(data) {
            $scope.todos = data;
        })
        .error(function(data) {
            console.log('error' + data);
        });

    $scope.createTodo = function() {
        console.log('formData  ' + $scope.formData)
        $http.post('/api/user/todo', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('error' + data);
            });
    };

    $scope.deleteTodo = function(todo) {
        $http.delete('/api/user/todo/' + todo._id)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('error' + data);
            });
    };

    $scope.editTodo = function(todo) {
        console.log('editTodo');
        $scope.editedTodo = todo;
        // Clone the original todo to restore it on demand.
        $scope.originalTodo = angular.extend({}, todo);
    };

    $scope.doneEditing = function(todo) {
        $scope.editedTodo = null;
        todo.text = todo.text.trim();

        $http.put('/api/user/todo/', $scope.todos[$scope.todos.indexOf(todo)])
            .error(function(data) {
                console.log('error' + data);
            });
    };

    $scope.revertEditing = function (todo) {
        $scope.todos[$scope.todos.indexOf(todo)] = $scope.originalTodo;
        $scope.doneEditing($scope.originalTodo);
    };

    $scope.toggleDone = function(todo) {
        $scope.todos[$scope.todos.indexOf(todo)].done = !$scope.todos[$scope.todos.indexOf(todo)].done;
        $http.put('/api/user/todo/' + todo._id + '/toggleDone')
            // .success(function(data) {
            //     $scope.todos = data;
            // })
            .error(function(data) {
                console.log('error' + data);
            });
    }
});