/**
 * @class       : server
 * @author      : theo (theo.j.lincke@gmail.com)
 * @created     : Sunday Oct 27, 2019 09:55:54 MDT
 * @description : server
 */

// 'use-strict'

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

/**
* @brief First gateway for root directory - shows high scores
*
* @param req - the incomming request
* @param res - the response to send
*/
app.get('/', function(req, res) {
  var query = 'SELECT FROM camera_game_db.users;';

        db.any(query)
        .then(function (rows) {
            res.render('index.html');
        })
        .catch(function (err) {
            // display error message in case an error
            console.log(err);
            res.render('index.html', {
                title: 'Home Page',
                data: '',
                color: '',
                color_msg: ''
            })
        })
});


/**
* The Login form
*/
app.get('/login', function(req, resp) {
  resp.render('login.html');
});


app.post('/login-form', function(req, resp) {
  query = `SELECT \'${req.body.username} FROM users`;
});


/**
 * The submit a login name
 */
app.post('/submit-form', function(req, resp) {
  query = `INSERT INTO users (email, password, score) VALUES (\'${req.body.email}\', crypt(\'${req.body.password}\', gen_salt(\'bf\', 8)), 0);`
  db.any(query);
  console.log(req.body);
  resp.send("submited form");
});

/**
* @brief Expects a post request with user, time stamp, and date
*
* @param function responds with 
*/
app.post("/tagpoint", function(request, response) {
  console.log(request.body);
  
  response.send("ACK\n");
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
