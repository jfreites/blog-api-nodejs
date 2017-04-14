process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Post = require('../models/post');

// Include dev-depencencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

// Before each test empty the mongo database
describe('Posts', () => {
    beforeEach( (done) => {
        Post.remove({}, (err) => {
            done();
        });
    });
});

/*
 * Test the /GET route
 */
describe('/GET posts', () => {
    it('it should GET all posts', (done) => {
        chai.request(app)
            .get('/api/posts')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                //res.body.length.should.be.eql(0);
                done();
            });
    });
});

/*
 * Test the /GET/:_id route
 */
describe('/GET/:id posts', () => {
    it('it should GET a post by the given id', (done) => {
        let post = new Post(
            { title: "Hello Express",
            authorId: "1",
            body: "Just an example for a blog post."}
        );
        post.save((err, post) => {
            chai.request(app)
                .get('/api/posts/' + post._id)
                .send(post)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('authorId');
                    res.body.should.have.property('body');
                    res.body.should.have.property('_id').eql(post.id);
                    done();
                });
        });
    });
});

/*
 * Test the /POST route
 */
describe('/POST post', () => {
    it('it should not POST a blog-post without a body field', (done) => {
        let post = {
            title: "Hello world example",
            authorId: "1"
        }
        chai.request(app)
            .post('/api/posts')
            .set('token', 'my-super-secure-auth-token')
            .send(post)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('body');
                res.body.errors.body.should.have.property('kind').eql('required');
                done();
            });
    });

    it('it should POST a blog-post', (done) => {
        let post = {
            title: "Hello world example",
            authorId: "1",
            body: "This is essentially going to be the simplest Express app you can create"
        }
        chai.request(app)
            .post('/api/posts')
            .set('token', 'my-super-secure-auth-token')
            .send(post)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Post succesfully created');
                res.body.post.should.have.property('title');
                res.body.post.should.have.property('authorId');
                res.body.post.should.have.property('body');
                done();
            });
    });
});
