var express = require('express');
var bodyParser = require('body-parser');
const {
    ObjectId
} = require('mongodb');

var {
    mongoose
} = require('./db/mongoose');
var {
    Todo
} = require('./models/todo');
var {
    User
} = require('./models/user');

var app = express();
app.use(bodyParser.json());

const port = process.env.port || 3000;

app.post('/todos', (req, res) => {

    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);

    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/todos', (req, res) => {

    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (e) => {
        res.status(400).send(e);
    });
})

app.get('/todos/:id', (req, res) => {

    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {

        if (!todo) {
            return res.status(400).send();
        }

        res.status(200).send({todo});

    }).catch((e) => {
        res.status(404).send();
    });

});


app.listen(port, () => {
    console.log('server connected');
});

module.exports = {
    app
};