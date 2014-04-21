'use strict';

var Todo = require('./models/todo');
var User = require('./models/user');

module.exports = function(app, passport) {
    // GET /
    app.get('/', isLoggedIn, function(req, res){
        req.user.twitter.displayName = req.user.twitter.displayName.split(' ')[0];
        res.render('index', { user : req.user });
    });

    // GET /landing
    app.get ('/landing', function(req, res) {
        if(req.isAuthenticated())
            res.redirect('/');
        else
            res.render('landing');
    });

// auth
    
    // GET /auth/twitter/
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // GET /auth/twitter/callback
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/landing'
        })
    );

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/landing');
    });
// todos

    // GET /api/todos
    app.get('/api/user/todos', isLoggedInApi, function(req, res){
        User.findById(req.user._id,
            function(err, user) {
                if(err)
                    res.send(err);
                res.json(user.todos)
            });
    });

    app.post('/api/user/todo', isLoggedInApi, function(req, res) {
        User.findByIdAndUpdate(req.user._id,
            {
                $push: { 
                    todos : { text: req.body.text } 
                }
            },
            function(err, user) {
                if(err)
                    res.send(err);
                res.json(user.todos);
            });
    });

    app.put('/api/user/todo', isLoggedInApi, function(req, res) {
        User.findById({ '_id' : req.user._id, 'todos._id' : req.body._id }, 
            function(err, user) {
                if(err)
                    req.send(err);

                user.todos.forEach(function(todo) {
                    if( req.body._id == todo._id ) {
                        todo.text = req.body.text;
                        todo.updated = Date.now();
                    }
                });

                user.save(function(err) {
                    if(err)
                        res.send(err);
                });

                res.send(user.todos);
            });
    });

    app.delete('/api/user/todo/:todo_id', isLoggedInApi, function(req, res) {
        User.findByIdAndUpdate(req.user._id,
            {
                $pull: {
                    todos: { _id: req.params.todo_id }
                }
            },
            function(err, user) {
                if(err)
                    res.send(err);
                res.json(user.todos);
            });
    });

    app.put('/api/user/todo/:todo_id/toggleDone', isLoggedInApi, function(req, res) {
        User.findById({ '_id' : req.user._id, 'todos._id' : req.params.todo_id }, 
            function(err, user) {
                if(err)
                    req.send(err);

                user.todos.forEach(function(todo) {
                    if( req.params.todo_id == todo._id ) {
                        todo.done = !todo.done
                    }
                });

                user.save(function(err) {
                    if(err)
                        res.send(err);
                });

                res.send(user.todos);
            });
    });

    // app.get('/api/todos', function(req, res){
    //     Todo.find(function(err, todos) {
    //         if(err)
    //             res.send(err);
    //         res.json(todos)
    //     });
    // });

    // GET /api/todo/123123123
    // app.get('/api/todo/:todo_id', function(req, res){
    //     Todo.findOne({
    //         _id: req.params.todo_id
    //     }, function(err, todo) {
    //         if(err)
    //             res.send(err);
    //         res.json(todo)
    //     });
    // });

    // POST /api/todo
    // app.post('/api/todo', function(req, res) {
    //     Todo.create({
    //         text: req.body.text,
    //         done: false
    //     }, function(err, todo) {
    //         if(err)
    //             res.send(err);

    //         Todo.find(function(err, todos) {
    //             if(err)
    //                 req.send(err);
    //             res.json(todos);
    //         });
    //     })
    // });

    // app.get('/api/todos/:todo_id', function(req, res) {
    //     Todo.remove({
    //         _id: req.params.todo_id
    //     }, function(err, todo) {
    //         if(err)
    //             res.send(err);

    //         Todo.find(function(err, todos) {
    //             if(err)
    //                 req.send(err);
    //             res.json(todos);
    //         });
    //     });
    // });

    // app.put('/api/todo/:todo_id/toggleDone', function(req, res) {
    //     Todo.findOne({
    //         _id: req.params.todo_id
    //     }, function(err, todo) {
    //         if(todo) {
    //             todo.done = !todo.done;
    //             todo.save(function(err) {
    //                 if(err)
    //                     res.send(err);
    //             });
    //         }

    //         Todo.find(function(err, todos) {
    //             if(err)
    //                 req.send(err);
    //             res.json(todos);
    //         });
    //     })
    // });

// users

    // GET /api/users

    app.get('/api/users/removeAll', isLoggedInApi, function(req, res) {
        User.remove(function(err) {
            if(err)
                res.send(err);
        });
    });

    app.get('/api/users', isLoggedInApi, function(req, res){
        User.find(function(err, users) {
            if(err)
                res.send(err);
            res.json(users)
        });
    });

    app.get('/api/user', isLoggedInApi, function(req, res) {
        User.findById(req.user._id,
            function(err, user) {
                if(err)
                    req.send(err);
                res.json(user);
            });
    });

    app.get('/api/user/:user_id', isLoggedInApi, function(req, res) {
        User.findById(req.params.user_id,
            function(err, user) {
                if(err)
                    req.send(err);
                res.json(user);
            });
    });

    app.get('/api/user/:user_id/todos', isLoggedInApi, function(req, res) {
        User.findById(req.params.user_id,
            function(err, user) {
                if(err)
                    req.send(err);
                res.json(user.todos);
            });
    });

    app.get('/api/user/:user_id/delete', function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if(err)
                res.send(err);

            User.find(function(err, users) {
                if(err)
                    req.send(err);
                res.json(users);
            });
        });
    });
}

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/landing');
}

function isLoggedInApi(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.json({ error: 'user not valid'});
}