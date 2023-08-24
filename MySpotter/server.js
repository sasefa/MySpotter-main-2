require('dotenv').config();
const express = require('express');
const session = require('express-session');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const viewRoutes = require('./routes/viewRoutes');
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const models = require('./models');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = new Sequelize('database', 'root', '1start2start!', {
  dialect: 'mysql'
});

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Middleware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, '/public/css')));
app.use('/js', express.static(path.join(__dirname, '/public/js')));

// Header configuration
app.use(function(req, res, next) {
  res.header("X-Content-Type-Options", "nosniff");
  next();
});

// View engine setup
const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts')
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Route setup
app.use('/api/users', userRoutes);
app.use('/api/workouts/:workout_id/exercises', exerciseRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/', viewRoutes);

// Database synchronization and server start
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
