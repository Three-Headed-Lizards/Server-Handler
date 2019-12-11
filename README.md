# The Three Headed Lizard

This is a project that allows drone remote access game play and a hide and global seek with users.

## Contribution

To contribute, please clone the repository locally and create a seperate branch. There are no rule restrictions on the remote repository master branch.

```bash
  $ git clone https://github.com/Three-Headed-Lizards
  $ git checkout -b <branch / feature name>
```

Update from the remote
```bash
  $ git fetch origin master # Update to pull from remote branches (pull does this)
  $ git pull --rebase # rebase, no merge
```

Push to repository (update first)
```bash
  $ git add . && git commit -m "<your message>"
  $ git push origin <branch name>
```

## Getting Started

All environment variables are locaed in a file called .env, please create this file and add the following:

```
DB_USER=<database username>
DB_PASSWORD=<database password>
DB_HOST=localhost
DB_PORT=<port number (5432 default psql)>
DB_DATABASE=camera_game_db (if you use the same database model)
```

Next, run the init.sql file

If you deply to heroku, run
```
  $ cat init.sql | heroku pg:psql -a <app name>
```

Finally, run the server
```
  $ npm install # install node dependencies
  $ node server.js >> /var/log/camera_game_server.log # run the server
```

## Built With

* [nodejs](https://nodejs.org/en/) - Dependency Management
* [heroku](https://www.heroku.com/) - Used to deploy the app

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License
