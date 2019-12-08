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
    var loggedin = false;
    var currentUser = localStorage.getItem('user_name');
    if(currentUser != null) {
      loggedin = true;
      var currentUserPage = "/user/" + currentUser;
    }

    dbh.any(query) 
    .then(function (rows) {
      resp.render("globaluserpage.html", 
      {
        data : rows,
        loggedin : loggedin,
        currentUserPage : currentUserPage
      });
    })
    .catch( function (err) {
      console.log("error", err);
      resp.render("globaluserpage.html");
    });
  }
}
