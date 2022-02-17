const User = require('../users/user');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// test
router.get('/', (req, res) => {
  // res.send('works')
  res.send('works');
});

// display all users // index
router.get('/all_users', (req, res, next) => {
  User.find({}, (err, users) => {
    res.json(users);
  });
});

// register new user
router.get('/register', (req, res) => {
  // set registration route folder
  // res.render('')
  res.send('working');
});

router.post('/register', async (req, res, next) => {
  try {
    if (req.body.password === req.body.verifyPassword) {
      const wantedUsername = req.body.username;
      const userExists = await User.findOne({ username: wantedUsername });
      if (userExists) {
        res.json({ message: 'username taken' });
        console.log('nope');
      } else {
        const salt = bcrypt.genSaltSync(10);

        const hashedPassword = bcrypt.hashSync(
          req.body.password,
          bcrypt.genSaltSync(10)
        );
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body);
        res.json({ message: 'username created', newUser });
        console.log('banger');
        req.session = newUser;
        console.log(req.session);
      }
    } else {
      // req.session.message = 'password must match'
      // res.send('passwords dont match')
      console.log('sent');
    }
  } catch (err) {
    next(err);
  }
});

// login route
router.get('/login', (req, res) => {
  User.find({}, (err, username) => {
    res.json({ username });
  });
  console.log('user log in get');
});

router.post('/login', async (req, res, next) => {
  // console.log(req.body);
  try {
    const userLogin = await User.findOne({ username: req.body.username });
    if (userLogin) {
      const validPassword = bcrypt.compareSync(
        req.body.password,
        userLogin.password
      );
      if (validPassword) {
        req.session.username = userLogin.username;
        req.session.loggedIn = true;
        res.send(`${userLogin} logged in`, userLogin);
        // console.log('req.session.username' + req.session.username);
        // console.log(req.session);
      } else {
        // redirect to login
        // res.redirect()
        console.log('next?');
      }
    } else {
      // redirect to login
      // res.redirect()
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  // set logout route
  res.redirect('');
});

module.exports = router;
