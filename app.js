let express = require('express');
let bodyParser = require('body-parser');
let config = require('config');
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird')

let app = express();
let port = 8080;

// Include Controllers
let posts = require('./controllers/posts');

// Connection to mongodb
//mongoose.connect('mongodb://localhost/blog'); for offline testing purpose
mongoose.connect(config.DBHOST);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('We are connected to mlab.com...');
});

// Parse app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

// Routes
app.use(posts);

// Run app on port {port}
app.listen(port, () => {
    console.log("Express server listening on port " + port);
});

module.exports = app; // for testing
