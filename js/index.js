module.exports = { 
  show_home : function (req, res, DataBaseHandler) {
    var query = 'select users.firstname as firstname, users.lastname as lastname, users.username as username, COUNT(game.tagtime) as count, SUM(game.tagtime) as sum from game inner join users on game.userid = users.userID  GROUP BY users.username, users.firstname, users.lastname order by count desc limit 3;'
  
          DataBaseHandler.any(query)
          .then(function (rows) {
              res.render('index.html', {
                // We limit to 3, but in the rare case there are not 3 players,
                // get the count
                num_players : rows.length,
                player_top_info : rows
              })
          })
          .catch(function (err) {
              // display error message in case an error
              console.log(err);
              res.render('index.html', {
                num_players : 0,
                player_top_info : [0]
              })
          });

  }
}
