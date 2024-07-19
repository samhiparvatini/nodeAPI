//Used to import Express.js module into Node.js. require() is used to import external modules into your application. 

//Express.js is a web application framework for Node.js. Provides a robust set of features for building web applications and APIs for Node.js, making it easier to handle HTTP requests, define routes, and much more. 

//The assignment to variable express is to make the functionality available within the application.
//The variable can be used to create an instance of an Express application and use its features to define routes, handle HTTP requests, and more
const express = require('express');
//const bodyParser = require('body-parser');
const router = require('./router');

// Creates a new express application. 
// This application is a JavaScript object that provides a set of methods and properties to define routes, handle HTTP requests, set up middleware, and configure your server.
// Variable app is used as reference to the new Javascript object/Express application
const app = express();
app.use(express.json());

/*app.all('*', async(req,res,next) => {
    // app.set('response', undefined);
    // req.appObj = this.app;
    // console.log(req.appObj);
    next();
});*/
//starting the server
//sets the port number that the Express.js server will listen on
//process.env.PORT retrieves the environment variable PORT
const port = process.env.PORT || 3000; //default to 3000
//app.use(bodyParser.json)
//console.log('body_parser');

//use the router for the defined routes in router.js
app.use('/api', router);

/*app.use((req,res,next) => {
    // res.json(req.appObj.get('response'));
    res.end();
});*/


//starts the Express.js server and tells the server to listen for the incoming HTTP requests on the specified port
//app.listen(port, () => {...} is used to start the server. 'port' is the port number that the server should listen on (either PORT env variable or default to 3000). 
// () => {...} is a callback function
// console.log() is used to log a message to the console as a indicator
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


