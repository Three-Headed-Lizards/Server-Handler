/**
 * @class       : server
 * @author      : theo (theo.j.lincke@gmail.com)
 * @created     : Sunday Oct 27, 2019 09:55:54 MDT
 * @description : server
 */

'use-strict'


const express = require('express')
const bodyParser = require('body-parser')

// Create a new instance of express
const app = express()

app.use(bodyParser.urlencoded({extended : true}));

/**
* @brief Expects a post request with user, time stamp, and date
*
* @param function responds with 
* @param 
*/
app.post("/tagpoint", function(request, response) {
  console.log(request.body.name);

  // For now, just respond with an ACK
  response.send("ACK");
});

app.listen(3000);
