var mongoose = require('mongoose')

mongoose.connect('mongodb://usrgoal:goalx@novus.modulusmongo.net:27017/zovy8Sev')

var Todo = mongoose.model('Todo', {
    text : String
});

exports.get = function(req, res){
    Todo.find(function(err, todos) {
        if(err)
            res.send(err);
        res.json(todos)
    });
};

exports.post = function(req, res) {
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo) {
        if(err)
            res.send(err);

        Todo.find(function(err, todos) {
            if(err)
                req.send(err);
            res.json(todos);
        });
    })
};

exports.delete = function(req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function(err, todo) {
        if(err)
            res.send(err);

        Todo.find(function(err, todos) {
            if(err)
                req.send(err);
            res.json(todos);
        });
    });
};

exports.done = function(req, res) {
    Todo.findOne({
        _id: req.params.todo_id
    }, function(err, todo) {
        if(err)
            res.send(err);
        todo.done = true;
        todo.save(function(err) {
            if(err)
                res.send(err);
        });

        Todo.find(function(err, todos) {
            if(err)
                req.send(err);
            res.json(todos);
        });
    })
};