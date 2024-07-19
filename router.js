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
        console.log(`Connection has been established successfully to ${config.host} in database ${config.database}`);
    })
    .catch(err => {
        console.error(`Unable to connect to the database:`, err);
    });

console.log('connection');
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
router.post('/users', async(req, res) => {
    console.log("received POST request");
    console.log("request body:", req.body);
    const {username, first_name, last_name, password, role_name} = req.body;
    try {
        const transaction = await sequelize.transaction()

        try{
            //insert into usersrole table
            const createUserRoleQuery = `
            INSERT INTO usersrole (role_name, created_at, updated_at) 
            VALUES ($role_name, NOW(), NOW())
            RETURNING role_id`;

            let bind = {'role_name': req.body.role_name}

            const [newUserRole, userRoleMetadata] = await sequelize.query(createUserRoleQuery, {
                transaction,
                bind,
                type: Sequelize.QueryTypes.INSERT
            });

            const role_id = newUserRole[0].role_id;
            console.log(role_id);
            //insert into users table
            const createUserQuery = `
            INSERT INTO users (username,first_name, last_name, password, role_id, created_at, updated_at) 
            VALUES ($username, $first_name, $last_name, $password, $role_id, NOW(), NOW())
            RETURNING *`;

            bind = {'username': req.body.username, 'first_name': req.body.first_name, 'last_name':req.body.last_name, 'password': req.body.password, 'role_id':role_id}
            const [newUser, userMetadata] = await sequelize.query(createUserQuery, {
                transaction,
                bind,
                type: Sequelize.QueryTypes.INSERT
            });

            //commit transaction if everything is successful
            await transaction.commit();

            console.log("user created successfuly:", newUser);
            await res.status(201).json({message: 'User successfully created', user: newUser});
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            throw error;
        }
    } catch (error) {
        console.error('Error creating user and role:', error);
        res.status(500).json({error: 'Failed to create user and role'});
    }
});

router.put('/users', (req, res) => {
    res.send('Create a new post');
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



router.get('/messages', (req, res) => {
    res.send('Show all messages');
});

router.post('/messages', (req, res) => {
    res.send('Start a new message');
});

router.get('/testsequelize', (req, res, next) => {
    res.send(sequelize.query('SELECT * FROM users', {type: Sequelize.QueryTypes.SELECT})
    .then(users => {
        console.log(users);
        // res.set('result', users);
        //res.json(users);
        // console.log(res);
        // console.log(req.appObj);
        // req.appObj.set('response', users);
        next();
        //res.json(res);
        //console.log(users);
      })
      .catch(err => {
        console.error('Error executing query:', err);
    }));
})
//export the router instance so other applications can use it
module.exports = router;

