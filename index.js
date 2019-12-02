function show_home(req, resp, DataBaseHandler) {
    var query = 'SELECT FROM camera_game_db.users;';

  
          db.any(query)
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

