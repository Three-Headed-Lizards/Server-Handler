

module.exports = {
    login_form : function(req, res){
      res.render('userLogin.html');
    },

    submit_login_data : function(req, res, dbh){
      var email_or_user = req.body.email_or_user;
      var password = req.body.password;

      var unique_user = `select * from users where username = \'${email_or_user}\' or email = \'${email_or_user}\';`;
      var input_password = `select password from users where username = \'${email_or_user}\' or email = \'${email_or_user}\';`;
      dbh.any(unique_user)
        .then(function (unique_user){
          console.log(unique_user)
        })
    },

    register_form : function (req, res) {
      res.render('userRegister.html');
    },

    submit_register_data : function (req, res, dbh) {
      var email = req.body.email;
      var password = req.body.password;
      var username = req.body.username;
      var firstname = req.body.firstname;
      var lastname = req.body.lastname;
      console.log(email, password, username, firstname, lastname);

      // Do some filtering of the data then return
      // by rendering a 404 error if invalid
      // or by sending to the user page if valid

      var unique_user = `select * from users where username = \'${username}\' or email = \'${email}\';`;

      var query = `insert into users (username, firstname, lastname, email, password) values (\'${username}\', \'${firstname}\', \'${lastname}\', \'${email}\', crypt(\'${password}\', gen_salt(\'bf\')));`;

      var unique_email_bool = false;
      var unique_user_bool = false;

      dbh.any(unique_user)
      .then(function (rows) {
        if(rows.length == 0) {
          dbh.any(query)
          .then(function (rows) {
            res.render('userLogin.html');
          })
          .catch(function (err) {
            console.log(err);
          });
        } else {
          res.send("Invalid username or email, already taken");
        }
      })
      .catch(function (err) {
        console.log(err);
      });

    }
}
