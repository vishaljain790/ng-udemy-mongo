const expect = require('expect');
const request = require('supertest');
const {
    ObjectId
} = require('mongodb');

const {
    app
} = require('./../server');
const {
    Todo
} = require('./../models/todo');

const todos = [{
    _id: new ObjectId(),
    text: "First test todo"
}, {
    _id: new ObjectId(),
    text: "Second test todo"
}];

beforeEach((done) => {

    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => {
        done();
    });

});


describe('POST /todos', () => {

    it('should create a new todo', (done) => {

        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({
                    text
                }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });

    });

    it('should not save todo', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => {
                    done(e);
                });
            })
    })

});

describe('GET /todos', () => {

    it('should fetch all todos', (done) => {

        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);

    });
});

describe('GET /todos/:id', () => {

    it('should fetch todo by id', (done) => {

        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                console.log(JSON.stringify(res.body, undefined, 2) + "//" + todos[0].text.trim());
                expect(res.body.todo.text.trim()).toBe(todos[0].text.trim())
            })
            .end(done);
    });

    it('should return if todo not found', (done) => {

        var hexId = new ObjectId().toHexString();

        request(app)
            .get(`/todos/${hexId}`)
            .expect(400)
            .end(done);
    });

    it('should return if id is not valid', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('DELETE todos/:id', () => {

    it('should delete a todo', (done) => {

        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {

                    expect(todo).toBeFalsy();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return if no todo found', (done) => {
        var hexId = new ObjectId().toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return if id is not valid', (done) => {
        request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done);
    })
});