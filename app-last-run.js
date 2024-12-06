require('dotenv').config();

const expressLayout = require('express-ejs-layouts');
const express = require('express');

const app = express();
const port = 5000 || process.env.PORT;
//app.listen(3000)

//const db = require('/server/config/db');
const connectDB = require('./server/config/db');

// npm install connect-flash
const flash = require('connect-flash');
const session = require('express-session');

//connect to Database
//connectDB();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//static Fules
app.use(express.static('public'));


//Templating engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

    /*app.get('/',(req,res) =>{
        const locals = {
            title: 'NodeJs',
            description:'Free NodeJs User Management System'
        }
        //res.send('Hello World');
        res.render('index',locals);
    });*/

// Routes
app.use('/', require('./server/routes/customer'))

// handle 404
app.get('*',(req, res)=>{
    res.status(404).render('404');
});

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});
// Express Session
app.use(
    session({
        secret: 'secret', // Replace 'secret' with a secure, random string for production
        resave: false,    // Don't save session if unmodified
        saveUninitialized: true, // Save uninitialized sessions
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        }
    })
);


  // Flash Messages
    //app.use(flash({ sessionKeyName: 'flashMessage' }));
    // Middleware for flash messages
    app.use(flash());