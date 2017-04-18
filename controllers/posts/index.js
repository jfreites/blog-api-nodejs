var express = require('express');

// Include Models
let Post = require('../../models/post');

var app = module.exports = express();

// Root path
app.get('/', (req, res) => res.json(
        {message: "Check documentation for availables endpoints."}
    )
);

// Endpoints
app.get('/api/posts', (req, res) => {
    Post.getPosts( (err, posts) => {
        if (err) {
            res.send(err);
        }
        res.json(posts);
    }, 10);
});

app.get('/api/posts/:_id', (req, res) => {
    Post.getPostById(req.params._id, (err, post) => {
        if (err) {
            res.send(err);
        }
        res.json(post);
    });
});

// Validating authorization Token on POST request
app.post('/api/posts', [require('../../middlewares/validateToken')]);

app.post('/api/posts', (req, res) => {
    Post.createPost(req.body, (err, post) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: "Post succesfully created", post });
        }
    });
});
