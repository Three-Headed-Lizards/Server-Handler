/**
 * @class       : userpage
 * @author      : theo (theo.j.lincke@gmail.com)
 * @created     : Tuesday Dec 03, 2019 15:14:18 MST
 * @description : userpage
 */

module.exports = {
  render_userpage : function (request, response, dataBaseHandle, username) {
    
    var total_tag_hits;
    var total_tag_time;

    var query_total_tags = `select users.firstname, users.lastname, users.username, count(game.tagtime), sum(game.tagtime) from users left join game on users.userID = game.userid where users.username =\'${username}\' GROUP BY users.firstname, users.lastname, users.username;`;

    var loggedin = false;
    var currentUser = localStorage.getItem('user_name');
    if(currentUser != null) {
      loggedin = true;
      var currentUserPage = "/user/" + currentUser;
    }

    dataBaseHandle.any(query_total_tags)
    .then(function (rows) {
      if(rows.length != 0) {
        response.render("userpage.html", {
          username_val : username,
          count_val : rows[0].count,
          tagtime_val : rows[0].count == 0 ? 0 : rows[0].sum,
          lastname_val : rows[0].lastname,
          firstname_val : rows[0].firstname,
          currentUserPage : currentUserPage,
          loggedin : loggedin
        });
      }
      else {
        console.log("No one with that username");
        response.render("nouserwiththatname.html", {
          username_val : username});
      }
    })
    .catch(function(err) {
      console.log('error', err);
    });
  }
}

