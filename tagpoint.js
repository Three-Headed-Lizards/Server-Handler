module.exports = {
  myFunction :function (request, response, dataBaseHandle) {
    console.log(request.body);
    // query = `INSERT INTO game (username, timestamp, tagtime) VALUES (\'${request.body.us  ername}\', \'${request.body.timestamp}'\, \'${request.body.tagtime}\');`;
   dataBaseHandle.any(query);
   response.send("ACK\n");
  }
}
