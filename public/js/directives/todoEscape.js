angular.module('corona')
	.directive('todoEscape', function() {
		'use strict';

		var ESCAPE_KEY = 27;

		return function(scope, elems, attrs) {
			elem.bind('keydown', function(event) {
				if(eveny.keyCode === ESCAPE_KEY) {
					scope.$apply(attrs.todoEscape);
				}
			});
		}
	});