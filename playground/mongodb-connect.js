// const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');
// var user = {name:'vishal', age: 25};

// var  {name} = user;
// console.log(name);


MongoClient.connect('mongodb://localhost:27017/ToDoApps', (err, client) => {

    if (err) {
        return console.log('Error occurs while connecting MongoDB server');
    }
    console.log('MongoDB server connected successfully');

   const db = client.db('ToDoApps');

    db.collection('ToDos').insertOne({
        'text':'चाहे वह संवाद उसकी भावनाओं का हो या पेट पर हाथ फेरकर सहलाने का हो। शिशु समस्त भावों को समझता है तभी तो गर्भवती स्त्रियों को अच्छा संगीत सुनने, अच्छी पुस्तकें पढ़ने अथवा अच्छा सोचने के लिए कहा जाता है',
        'completed':true
    },(err,result) => {
        if(err){
            return console.log('Unable to insert new data');
        }
        console.log(JSON.stringify(result.ops, undefined,2));
    });

    // db.collection('Users').insertOne({
    //     name: 'vishal',
    //     age: 25,
    //     location: 'Jaipur,india'

    // },(err,result) => {
    //     if(err) {
    //         return console.log('unable to insert new document');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    client.close();

});