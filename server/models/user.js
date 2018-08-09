var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        default: ' vishal7@gmail.com '
    }
});

module.exports = {
    User
};