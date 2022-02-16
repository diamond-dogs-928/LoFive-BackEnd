require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 4000;
const SESSION_SECRET = process.env.SESSION_SECRET;
const cors = require('cors');
const noteController = require('./controllers/noteController');
// const Note = require('./models/note')
const userRoute = require('./controllers/sessions');
const session = require('express-session');

// Bring in cors to communicate across ports

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session middleware
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.loggedIn = req.session.loggedIn;
  next();
});
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  req.session.message = '';
  next();
});

app.use('/session', userRoute);
app.use('/notes', noteController);

app.listen(PORT, () => {
  console.log('Smooth tunes flowing out of port: ', PORT);
});
