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
        res.json({
          message: 'username taken',
          loggedIn: false,
        });
        console.log('nope');
      } else {
        const salt = bcrypt.genSaltSync(10);

        const hashedPassword = bcrypt.hashSync(
          req.body.password,
          bcrypt.genSaltSync(10)
        );
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body);
        res.json({ message: 'username created', newUser, loggedIn: true });
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
  // console.log(req.body.username + '    hitting before the try/catch');
  try {
    const userLogin = await User.findOne({ username: req.body.username });
    // console.log(userLogin);
    if (!userLogin) {
      res.send('username is invalid');
    } else {
      const ifUserIsValid = bcrypt.compareSync(
        req.body.password,
        userLogin.password
      );
      if (ifUserIsValid) {
        (req.session.loggedIn = true),
          (req.session.username = userLogin.username);
        res.status(200).json({
          message: 'status 200: response ok',
          user: userLogin,
          username: userLogin.username,
          loggedIn: true,
        });
      } else {
        res.status(500).json({
          message: 'status 500: server error',
        });
      }
    }
  } catch (err) {
    console.log(err + '   error logging happening');
    next(err);
  }
});

router.get('/logout', async (req, res, next) => {
  console.log('logout route is hit');
  // console.log(req.session);
  try {
    console.log('try block hit');
    req.session.destroy();
    res.status(200).json({
      loggedOut: true,
      message: 'logout successful',
    });
  } catch (err) {
    res.status(500).json({
      loggedOut: false,
      message: 'logout failed',
    });
    console.log(err);
    next(err);
  }
});

module.exports = router;
