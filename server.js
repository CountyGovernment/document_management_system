const express = require('express');
const path = require('path');

const app = express();

// send our index.html file to the user for the home page
app.get('/', (req, res) => {
res.sendFile(path.join(`${__dirname}/index.html`));
});

// create routes for the admin section
// get an instance of the router
const adminRouter = express.Router();

// route middleware that will happen on every request
adminRouter.use((req, res, next) => {

// log each request to the console
console.log(req.method, req.url)

// continue doing what we were doing and go to the route
next();
});

// admin main page. the dashboard (http://localhost:1337/admin)
adminRouter.get('/', (req, res) => {
    res.send('I am the dashboard!');
});

// users page (http://localhost:1337/admin/users)
adminRouter.get('/users', (req, res) => {
    res.send('I show all the users!');
});

 // route with parameters (http://localhost:1337/admin/users/wanja)
 adminRouter.get('/users/:name', (req, res) => {
 	res.send(`hello ${req.params.name}!`);
 });

// posts page (http://localhost:1337/admin/posts)
adminRouter.get('/posts', (req, res) => {
    res.send('I show all the posts!');
});

// apply the routes to our application
app.use('/admin', adminRouter);

// start the server
app.listen(1337);
console.log('1337 is the magic port!');


