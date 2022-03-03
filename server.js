require('dotenv').config();
const express = require('express');
const app = express();
// const PORT = 4000;
app.set('port', process.env.PORT || 4000);
const SESSION_SECRET = process.env.SESSION_SECRET;
const cors = require('cors');
const noteController = require('./controllers/noteController');
// const Note = require('./models/note')
const userRoute = require('./controllers/sessions');
const session = require('express-session');

// Bring in cors to communicate across ports
var whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5555',
  'https://lo-five-frontend.herokuapp.com/',
  '*' /** other domains if any */,
];
var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
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

app.listen(app.get('port'), () => {
  console.log(`Smooth tunes flowing out of port: , ${app.get('port')}`);
});
