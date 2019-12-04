

module.exports = {
    register_form : function (req, res) {
      res.render('login.html');
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

      var unique_user = `select * from users where username = \'${username}\';`;
      var unique_email = `select * from users where email = \'${email}\';`;

      var query = `insert into users (username, firstname, lastname, email, password) values (\'${username}\', \'${firstname}\', \'${lastname}\', \'${email}\', crypt(\'${password}\', gen_salt(\'bf\')));`; 

      var unique_email_bool = false;
      var unique_user_bool = false;

      dbh.any(unique_user)
      .then(function (rows) {
        unique_user_bool = rows.length == 0;
      })
      .catch(function (err) {
        console.log(err);
      });

      dbh.any(unique_email)
      .then(function (rows) {
        unique_email_bool = rows.length == 0;
        console.log(rows);
      })
      .catch(function (err) {
        console.log(err);
      });
      
      if(!unique_user_bool && !unique_email_bool) {
        res.send("Invalid username and email, already taken");
        return;
      }

      if(!unique_user_bool) {
        res.send("Invalid username, already taken");
        return;
      }

      if(!unique_email_bool) {
        res.send("Invalid email, already taken");
        return;
      }

      dbh.any(query)
      .then(function (rows) {
        res.send('good');
      })
      .catch(function (err) {
        console.log(err);
        res.send('noope');
      });

    }
}
