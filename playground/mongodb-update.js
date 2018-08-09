const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApps', (err, client) => {

    if (err) {
        return console.log('Unable to connect mongodb server');
    }
    const db = client.db('ToDoApps');

    db.collection('ToDos').findOneAndUpdate({
        _id: new ObjectID('5b602427d68d79776aa1162b')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
});