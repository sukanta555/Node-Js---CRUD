const express = require('express');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const connectDB = require('./server/config/db');

const app = express();
const port = 5000 || process.env.PORT;

// Connect to Database
//connectDB();
//const connectDB = require('./server/config/db');

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Static Files
app.use(express.static('public'));

// Session Middleware
app.use(
    session({
        secret: 'secret', // Replace 'secret' with a secure, random string
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
    })
);

// Flash Middleware
app.use(flash());

// Pass flash messages to all views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success'); // For success messages
    res.locals.error_msg = req.flash('error');     // For error messages
    next();
});

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/customer'));

// Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
});

// Start Server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});