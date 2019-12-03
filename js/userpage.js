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

    var query_total_tags = `select COUNT(*) as count, SUM(tagtime) as sum from game where username = \'${username}\';`;

    dataBaseHandle.any(query_total_tags)
    .then(function (rows) {
      if(rows[0].count != 0) {
        console.log("Gottem"); 
        response.render("userpage.html", {
          username_val : username,
          count_val : rows[0].count,
          tagtime_val : rows[0].sum
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
