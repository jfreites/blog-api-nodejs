var mongoose = require('mongoose');

var postSchema = mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }

},
{
    versionKey: false
});

const Post = module.exports = mongoose.model('Post', postSchema);

// Listing all posts
module.exports.getPosts = (callback, limit) => {
    Post.find(callback).limit(limit);
}

// Find a Post by ID
module.exports.getPostById = (postId, callback) => {
    Post.findById(postId, callback);
}

// Create a Post
module.exports.createPost = (post, callback) => {
    Post.create(post, callback);
    //let newPost = new Post(post);
    //newPost.save(callback);
}
