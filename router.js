//router

//router calls handlers
//import handlers

const express = require('express');

//creates a new instance of Express Router 
const router = express.Router();

const Sequelize = require('sequelize');
const config = require('./config.json')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging:false
});

sequelize.authenticate() 
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
//define routes

//defining a route handler to handle GET requests to the specified endpoint of the Express application
// a GET request is to request data from a server. READ ONLY.
// app.get(endpoint, ...) tells Express to handle GET requests to this URL path.
//(req, res) => {...} is the callback function that gets executed when a GET request is made to the endpoint. req is short for request and res is short for response.
// res.json({message: ...}) is for inside the callback function, where it sends a JSON response back to the client with a message as an indicator that the request has been performed.
router.get('/users', (req, res) => {
    res.send('Get all users');
});

//defining a roure handler to handle POST requests to the specified endpoint
// a POST request to submit data to be processed by a server. commonly used to create or update a resource on the server. 
//app.post(endpoint, ...) tells Express to handle POST requests to this URL path.
//(req, res) => {...} is the callback function that gets executed when a POST request is made to the endpoint. req is short for request and res is short for response.
//res.json({message: ...}) is for inside the callback function, where it sends a JSON response back to the client with a message as an indicator that the request has been performed.
router.post('/users', (req, res) => {
    res.send('Create a new user');
});

router.get('/profile', (req, res) => {
    res.send('Show user profile');
});

router.get('/about', (req, res) => {
    res.send('about');
});

router.get('/posts', (req, res) => {
    res.send('Get all posts');
});

router.post('/users', (req, res) => {
    res.send('Create a new post');
});

router.get('/messages', (req, res) => {
    res.send('Show all messages');
});

router.post('/messages', (req, res) => {
    res.send('Start a new message');
});

router.get('/testsequelize', (req, res) => {
    res.send(sequelize.query('SELECT * FROM users', {type: Sequelize.QueryTypes.SELECT})
    .then(users => {
        console.log(users);
      })
      .catch(err => {
        console.error('Error executing query:', err);
    }));
})
//export the router instance so other applications can use it
module.exports = router;

