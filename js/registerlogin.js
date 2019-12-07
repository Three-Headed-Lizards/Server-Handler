

module.exports = {
    login_form : function(req, res, user_id) {
      if(user_id != "") {
        res.send(`/user/${user_id}`);
        return true;
      }
      res.render('userLogin.html');
    }, 

    login_submit_form : function(req, res, dbh, user_id){

      var username = req.body.username;
      var password = req.body.password;

      var db_query = `SELECT username FROM users WHERE username=\'${username}\' and password=crypt(\'${password}\', password);`;

      dbh.any(db_query)
      .then(function (data) {
        if(data.length == 0){
          res.render('userLogin.html', {
            statusval : "Error, no user with that username or incorrect password"
          });
        } else {
          user_id = data[0].username;
          res.redirect(`/user/${username}`);
          return true;
        }
      })
      .catch(function (err) {
        console.log(err);
        res.send("Internal Error");
      });
    },

    logout_form : function(req, res, user_id) {
      user_id = "";
      res.redirect('/login');
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

      // Do some filtering of the data then return
      // by rendering a 404 error if invalid
      // or by sending to the user page if valid

      var unique_user = `select * from users where username = \'${username}\' or email = \'${email}\';`;

      var query = `insert into users (username, firstname, lastname, email, password) values (\'${username}\', \'${firstname}\', \'${lastname}\', \'${email}\', crypt(\'${password}\', gen_salt(\'bf\')));`;

      var unique_email_bool = false;
      var unique_user_bool = false;

      //password validation

      var valid_bool = false;
      var minLength = 5;

      if(password.length >= minLength) {
        valid_bool = true;
      } else {
        valid_bool = false;
      }

      dbh.any(unique_user)
      .then(function (rows) {
        if(rows.length == 0 && valid_bool == true) {
          dbh.any(query)
          .then(function (rows) {
            res.render('userLogin.html');
          })
          .catch(function (err) {
            console.log(err);
          });
        } else if(rows.length == 0 && valid_bool == false){
           document.getElementById("message_valid").classList.remove("valid");
           document.getElementById("message_valid").classList.add("invalid");
           console.log("Nice");
        } else {
          res.send("Invalid username or email, already taken");
        }
      })
      .catch(function (err) {
        console.log(err);
      });

    }
}
