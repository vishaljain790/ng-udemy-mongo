const {
    mongoose
} = require('./../server/db/mongoose');
const {
    Todo
} = require('./../server/models/todo');

var id = '5b6bc0b03a465b2460bf02b7';

Todo.find({
    _id: id
}).then((todos) => {
    console.log('todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('todo', todo);
});

Todo.findById(id).then((todo) => {
    console.log('Todo by id: ', todo);
});