module.exports = {
  myFunction : function (request, response, dataBaseHandle) {
    
    var uname = request.body.username;
    var timestmp = request.body.timestamp;
    var tagtime = request.body.tagtime;
    var userid;
  
    // Used to check if there is a user with the specified username in the db
    validator = `SELECT userID from users where username = \'${uname}\'`
    
    // Insert the data point
    dataBaseHandle.any(validator)
    .then(function (rows) {
      if(rows.length == 1) {
        userid = rows[0].userid;
        query = `INSERT INTO game 
                  (userid, username, timestamp, tagtime) 
                 VALUES 
                  (\'${userid}\', \'${uname}\', \'${timestmp}'\, \'${tagtime}\');`;

        query2 = `INSERT INTO sessions 
                  (userid, username, total_sessions) 
                 VALUES 
                  (\'${userid}\', \'${uname}\', \'${timestmp}'\, \'${tagtime}\');`;
  
        dataBaseHandle.any(query)
        .then(function (rows) {
        })
        .catch(function(err) {
          console.log('error', err);
        });
      }
      else {
        console.log("Error, invalid key");
      }
    })
    .catch(function(err) {
      console.log('error', err);
    });

   response.send("ACK\n");
  }
}
