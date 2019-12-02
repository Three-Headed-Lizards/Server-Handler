module.exports = { 
  show_home : function (req, res, DataBaseHandler) {
    var query = 'SELECT FROM camera_game_db.users;';

  
          DataBaseHandler.any(query)
          .then(function (rows) {
              res.render('index.html');
          })
          .catch(function (err) {
              // display error message in case an error
              console.log(err);
              res.render('index.html', {
                  title: 'Home Page',
                  data: '',
                  color: '',
                  color_msg: ''
              })
          })
  }
}
