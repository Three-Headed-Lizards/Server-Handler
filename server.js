/**
 * @class       : server
 * @author      : theo (theo.j.lincke@gmail.com)
 * @created     : Sunday Oct 27, 2019 09:55:54 MDT
 * @description : server
 */

// TODO - create a config.js with all this junk
/*
 * Dotenv allows to read local
 * environment variables (different local and
 * remote variables such as password etc)
 * stored in a .env file in gitignore
 */
const dotenv = require('dotenv');
dotenv.config();
const isProduction = process.env.NODE_ENV === 'production'

// Express JS Framework
const express = require('express');
let app = express();
app.use(express.urlencoded());

// Both necessary for our express app, no config for now
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
// Nunjucks configuration - the folder for template files
var PATH_TO_TEMPLATES = './templates';
nunjucks.configure(PATH_TO_TEMPLATES, {
  autoescape: true,
  express: app
});

/*
 * These are Four recommendations I found here: 
 * https://www.taniarascia.com/node-express-postgresql-heroku/
 * For security
 */
const helmet = require('helmet');
app.use(helmet());
const compression = require('compression');
app.use(compression());

// Rate limiter - prevents DDos by limiting connections
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowsMS: 1 * 60 * 1000, // 1 minute
  max: 20,
})
const tagpointPostLimiter = rateLimit({
  windowsMS: 1 * 60 * 1000, // 1 minute
  max: 5,
})

// // Note that this limits every endpoint
app.use(limiter);

// Cors limits cross origin resource sharing
const cors = require('cors');
const origin = {
  origin: isProduction ? 'https://the-game-three.herokuapp.com' : '*',
}
app.use(cors(origin));

const {body, check} = require('express-validator');

// Local Modules 
const pgp = require('pg-promise')();

// Databse configuration -
const dbConfig = {
  host: `${process.env.DB_HOST}`,
  port: process.env.DB_PORT,
  database: `${process.env.DB_DATABASE}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`
};


// Create a new db handler
let db = pgp(dbConfig);


// Local modules
const loginreg = require('./js/registerlogin.js');
const index = require('./js/index.js');
const userpage = require('./js/userpage.js');
const globaluserpage = require('./js/globaluserpage.js');
const tagpoint = require('./js/tagpoint.js');


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
* The Login form and register form
*/
app.get('/register', function(req, resp) {
  loginreg.register_form(req, resp);
});

app.get('/login', function(req, resp){
  loginreg.login_form(req, resp);
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
app.post(
  "/tagpoint", 
  [
    check('username')
      .not()
      .isEmpty()
      .isLength({min: 3, max: 255})
      .trim(),
    check('timestamp')
      .not()
      .isEmpty()
      .isLength({min: 3, max: 255})
      .trim(),
    check('date')
      .not()
      .isEmpty()
      .isLength({min: 3, max: 255})
      .trim(),
  ],

  (req, resp) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return response.status(422).json({errors: errors.array()});
    }

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
