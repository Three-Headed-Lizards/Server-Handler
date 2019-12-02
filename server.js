/**
 * @class       : server
 * @author      : theo (theo.j.lincke@gmail.com)
 * @created     : Sunday Oct 27, 2019 09:55:54 MDT
 * @description : server
 */

// 'use-strict'

const loginreg = require('./registerlogin.js');
const index = require('./index.js');
const tagpoint = require('./tagpoint.js');

// Similar to includes - include the node modules
// Express js framework
const express = require('express');

// Create a new instance of express application
let app = express();
app.use(express.urlencoded());

// Body parser for post requests
const bodyParser = require('body-parser');

// Nunjucks for templates because pug is stupid
const nunjucks = require('nunjucks');

// Postgres handler
const pgp = require('pg-promise')();

// Nunjucks configuration - the folder for template files
var PATH_TO_TEMPLATES = './templates';
nunjucks.configure(PATH_TO_TEMPLATES, {
  autoescape: true,
  express: app
});

// Databse configuration - 
// TODO - Password and user need to be externally accessed
const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'camera_game_db',
  user: 'postgres',
  password: 'notarealpassword'
};


// Create a new db handler
let db = pgp(dbConfig);

///////////////////////////////// CONNER INDEX HOME PAGE ///////////////
/**
* @brief First gateway for root directory - shows high scores
*
* @param req - the incomming request
* @param res - the response to send
*/
app.get('/', function(req, res) {
  index.show_home(req, res, db);
});


//////////////////////////////////////// REGISTER LOGIN ////////////////////////////
/**
* The Login form
*/
app.get('/login', function(req, res) {
  loginreg.register_home(req, res);
});

app.post('/login-form', function(req, resp) {
  query = `SELECT \'${req.body.username} FROM users`;
});

/**
 * The submit a login name
 */
app.post('/submit-form', function(req, resp) {
  loginreg.login_form(req, res, db);
});



//////////////////////////////////////////// TAGPOINT /////////////////////////////
/**
* @brief Expects a post request with user, time stamp, and date
*
* @param function responds with 
*/
app.post("/tagpoint", function(req, resp) {
  tagpoint.myFunction(req, resp, db);
});


/**
* @brief Primary get request that renders index
*
* @param req - the request including parameters
* @param res - the response
*/
// app.get('/', function(req, res) {
//   res.render('index.html');
// });
//

app.listen(3000);
