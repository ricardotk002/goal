
/**
 * Module dependencies.
 */

var express 	= require('express');
var flash		= require('connect-flash');
var http 		= require('http');
var mongoose 	= require('mongoose');
var path 		= require('path');
var passport	= require('passport');

var database 	= require('./config/database');
//var routes = require('./routes');
//var todos = require('./routes/todo');

var app = express();

// database connection

mongoose.connect(database.url);

// passport connfiguration
require('./config/passport')(passport);

// all environments
app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.cookieSession({ secret: "coronita" }));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.session({ secret: 'coronitasecret' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());
	app.use(app.router);
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.configure('development', function () { app.locals.pretty = true; });
}

require('./app/routes')(app, passport);

// app.get('/', routes.index);
// app.get ('/landing', function (req, res) { res.render ('landing');  });
// app.get('/api/todos', todos.get);
// app.get('/api/todo/:todo_id', todos.getOne);
// app.post('/api/todos', todos.post);
// app.delete('/api/todos/:todo_id', todos.delete);
// app.get('/api/todo/:todo_id/toggleDone', todos.toggleDone);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
