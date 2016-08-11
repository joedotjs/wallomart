var path = require('path'); // Built-in library
var express = require('express');
var app = express();
module.exports = app;

// Set up view engine to activate res.render
var swig = require('swig');
app.engine('html', swig.renderFile);                // Register engine named "html" with express, it is swig.renderFile
app.set('view engine', 'html');                     // Set default view engine to be the one called "html"
app.set('views', path.join(__dirname, '../views')); // Here is where all my templates will be.
swig.setDefaults({ cache: false });                 // Don't ever cache a file, swig.

/*
     (req, res) pipeline
        starts here
            |
            |
            |
            V
 */

var morgan = require('morgan');
app.use(morgan('dev')); // First, log EVERYTHING.

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // If POST/PUT with JSON body, parse and set req.body.
app.use(bodyParser.urlencoded({ extended: false })); // If POST/PUT with form body, parse and set req.body

var nodeModulesPath = path.join(__dirname, '../node_modules');
var publicDirPath = path.join(__dirname, '../public');

app.use(express.static(nodeModulesPath)); // req.url match something in node_modules?
app.use(express.static(publicDirPath));   // req.url match something in public directory?

// Home page!
app.get('/', function (req, res, next) {
    res.render('index');
});

app.use('/products', require('./routers/products'));