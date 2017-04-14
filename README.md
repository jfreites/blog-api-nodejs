## blog-api-nodejs
RESTful API application using NodeJS, Express and MongoDB. Include a several tests using Mocha.

## Usage
Just clone or download and run **npm install** and then **npm start** to start

For default this app use [mlab.com](https://mlab.com) for persistent storage (with Mongo), but you can create a local Mongo database and then update de config files properly.

## Testing
For run the tests **npm test**

## Availables endpoints

Get all posts
```
GET /api/posts
```

Get invidual post by id
```
GET /api/posts/:id
```

Create a post (you need a token)
```
POST /api/posts
```
