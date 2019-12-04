/**
 * @class       : globaluserpage
 * @author      : theo (theo.j.lincke@gmail.com)
 * @created     : Tuesday Dec 03, 2019 15:38:46 MST
 * @description : globaluserpage
 */

module.exports = {
  render_global_user_page : function (req, resp, dbh) {
    
    // Limit the number of high scores (They are ordered by count)
    limit = 10;

    var query = `select users.firstname as firstname, users.lastname as lastname, users.username as username, COUNT(game.tagtime) as count, SUM(game.tagtime) as sum from game inner join users on game.userid = users.userID GROUP BY users.username, users.firstname, users.lastname order by count desc limit ${limit};`

    dbh.any(query) 
    .then(function (rows) {
      console.log(rows[0].username);
      console.log(rows);
      resp.render("globaluserpage.html", 
      {
        data : rows 
      });
    })
    .catch( function (err) {
      console.log("error", err);
      resp.render("globaluserpage.html");
    });
  }
}
