/**
 * @class       : server
 * @author      : theo (theo.j.lincke@gmail.com)
 * @created     : Sunday Oct 27, 2019 09:55:54 MDT
 * @description : server
 */

const loginreg = require('./js/registerlogin.js');
const index = require('./js/index.js');
const userpage = require('./js/userpage.js');
const globaluserpage = require('./js/globaluserpage.js');
const tagpoint = require('./js/tagpoint.js');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const pgp = require('pg-promise')();
const express = require('express');

// Create a new instance of express application
let app = express();
app.use(express.urlencoded());

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
<<<<<<< HEAD
  database: 'the-game-three',
  user: 'postgres',
=======
  database: 'camera_game_db',
  user: 'ryanhorn',
>>>>>>> c3feb84b894089756769850b9ad1e30713696184
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
app.get('/register', function(req, resp) {
  loginreg.register_form(req, resp);
});

app.post('/login', function(req, resp) {
  loginreg.register_form(req, resp);
});

/**
 * The submit a login name
 */
app.post('/submit-form', function(req, resp) {
  loginreg.submit_register_data(req, resp, db);
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

app.get("/user/:username", function(req, resp) {
  userpage.render_userpage(req, resp, db, req.params.username);
});

app.get("/usersall", function(req, resp) {
  globaluserpage.render_global_user_page(req, resp, db);
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

app.listen(process.env.PORT || 3000);
