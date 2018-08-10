const {ObjectId} = require('mongodb');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {mongoose} = require('./../server/db/mongoose');

Todo.findByIdAndRemove('5b6bda06a24f6334e58d5cab').then((todo) => {

    console.log(todo);
});