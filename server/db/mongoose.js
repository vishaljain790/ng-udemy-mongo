var mongoose = require('mongoose');
//mongodb://<dbuser>:<dbpassword>@ds031741.mlab.com:31741/todoapp  
//mongodb://vjandvj:vj1992@ds031741.mlab.com:31741/todoapp
//mongodb://localhost:27017/ToDoApp
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ToDoApp');

module.exports = {
    mongoose
};