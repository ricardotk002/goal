
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var todos = require('./routes/todo');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.configure('development', function () { app.locals.pretty = true; });
}

app.get('/', routes.index);
app.get('/api/todos', todos.get);
app.post('/api/todos', todos.post);
app.delete('/api/todos/:todo_id', todos.delete);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
