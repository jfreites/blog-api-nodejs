let express = require('express');
let app = express();
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
let bodyParser = require('body-parser');
let config = require('config');
let port = 8080;

// Include Models
let Post = require('./models/post');

// Connection to mongodb
//mongoose.connect('mongodb://localhost/blog'); for offline testing purpose
mongoose.connect(config.DBHOST);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('we are connected with mlab.com...');
});

// Parse app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

// Root path
app.get('/', (req, res) => res.json(
        {message: "Check documentation for availables endpoints for testing."}
    )
);

// Endpoints
app.get('/api/posts', (req, res) => {
    Post.getPosts( (err, posts) => {
        if (err) {
            res.send('ERROR: ' + err.message);
        }
        res.json(posts);
    }, 10);
});

app.get('/api/posts/:_id', (req, res) => {
    Post.getPostById(req.params._id, (err, post) => {
        if (err) {
            res.send('ERROR: ' + err.message);
        }
        res.json(post);
    });
});

app.post('/api/posts', (req, res) => {
    Post.createPost(req.body, (err, post) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: "Post succesfully created", post });
        }
    });
});

app.listen(port);
console.log("Listening on port " + port);
module.exports = app; // for testing
