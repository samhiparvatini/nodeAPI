const express = require('express');

const app = express();


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
const port = process.env.PORT || 3000; //default to 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
