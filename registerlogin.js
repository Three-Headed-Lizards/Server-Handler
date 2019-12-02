

function login_form(req, res, dataBaseHandle) {
    query = `INSERT INTO users (email, password, score) VALUES (\'${req.body.email}\', c  rypt(\'${req.body.password}\', gen_salt(\'bf\', 8)), 0);`
    dataBaseHandle.any(query);
    console.log(req.body);
    resp.send("submited form");
}

function register_home(req, res) {
  resp.render('login.html');
}
