app.post("/tagpoint", function(request, response) {

  // TODO store in database smartly` 

  console.log(request.body);
  query = `INSERT INTO game (username, timestamp, tagtime) VALUES (\'${request.body.username}\', \'${request.body.timestamp}'\, \'${request.body.tagtime}\');`
  db.any(query);

  response.send("ACK\n");
});

