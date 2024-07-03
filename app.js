//Used to import Express.js module into Node.js. require() is used to import external modules into your application. 

//Express.js is a web application framework for Node.js. Provides a robust set of features for building web applications and APIs for Node.js, making it easier to handle HTTP requests, define routes, and much more. 

//The assignment to variable express is to make the functionality available within the application.
//The variable can be used to create an instance of an Express application and use its features to define routes, handle HTTP requests, and more
const express = require('express');

// Creates a new express application. 
// This application is a JavaScript object that provides a set of methods and properties to define routes, handle HTTP requests, set up middleware, and configure your server.
// Variable app is used as reference to the new Javascript object/Express application
const app = express();


//defining the routes

//defining a route handler to handle GET requests to the specified endpoint of the Express application
// a GET request is to request data from a server. READ ONLY.
// app.get(endpoint, ...) tells Express to handle GET requests to this URL path.
//(req, res) => {...} is the callback function that gets executed when a GET request is made to the endpoint. req is short for request and res is short for response.
// res.json({message: ...}) is for inside the callback function, where it sends a JSON response back to the client with a message as an indicator that the request has been performed.
app.get('/api/listusers', (req, res) => {
    res.json({message: 'Get all users'});
});

//defining a roure handler to handle POST requests to the specified endpoint
// a POST request to submit data to be processed by a server. commonly used to create or update a resource on the server. 
//app.post(endpoint, ...) tells Express to handle POST requests to this URL path.
//(req, res) => {...} is the callback function that gets executed when a POST request is made to the endpoint. req is short for request and res is short for response.
//res.json({message: ...}) is for inside the callback function, where it sends a JSON response back to the client with a message as an indicator that the request has been performed.

//defining the routes
app.get('/api/users', (req, res) => {
    res.json({message: 'Get all users'});
});

app.post('/api/users', (req, res) => {
    res.json({message: 'Create a new user'});
});

app.get('api/profile', (req, res) => {
    res.json({message: 'Show user profile'})
});

app.get('/api/about', (req, res) => {
    res.json({message: 'about'});
});

app.get('/api/posts', (req, res) => {
    res.json({message: 'Get all posts'});
});

app.post('/api/users', (req, res) => {
    res.json({message: 'Create a new post'});
});

app.get('api/messages', (req, res) => {
    res.json({message: 'Show all messages'})
});

app.post('/api/users', (req, res) => {
    res.json({message: 'Start a new message'});
});

//starting the server
//sets the port number that the Express.js server will listen on
//process.env.PORT retrieves the environment variable PORT
const port = process.env.PORT || 3000; //default to 3000

//starts the Express.js server and tells the server to listen for the incoming HTTP requests on the specified port
//app.listen(port, () => {...} is used to start the server. 'port' is the port number that the server should listen on (either PORT env variable or default to 3000). 
// () => {...} is a callback function
// console.log() is used to log a message to the console as a indicator
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
