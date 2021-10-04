const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
const sequelize = require("./config/connection");

// const MyPromise = require('some-promise-lib');
const confetti = require('canvas-confetti');
// confetti.Promise = MyPromise;


//session
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// setup express handlerbars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// defined sequelize


// use public stylesheets, etc.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));


// setup routes
const routes = require('./controllers/');
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });