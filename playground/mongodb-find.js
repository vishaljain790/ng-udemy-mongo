const {
    MongoClient, ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApps', (err, client) => {

    if (err) {
        return console.log('Unable to connect mongodb server');
    }
    const db = client.db('ToDoApps');

    db.collection('ToDos').find().toArray().then((docs) => {

        console.log('Todos');
        console.log(JSON.stringify(docs, undefined,2));

    }, (error) => {
        console.log('Unable to find data', err);
    });
});