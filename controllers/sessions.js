const User = require('../users/user');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', (req, res) => {
  // res.send('works')
  res.send('works');
});

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
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body);
        console.log(newUser);
        res.json({ message: 'username created', newUser });
        console.log('banger');
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
router.get('/login', (req, res) => {
  User.find({}, (err, username) => {
    res.json({ username });
  });
  console.log('user log in get');
});

router.post('/login', async (req, res, next) => {
  try {
    const userLogin = await User.findOne({ username: req.body.username });
    if (userLogin) {
      const validPassword = bcrypt.compareSync(
        req.body.password,
        userLogin.password
      );
      if (validPassword) {
        req.session.username = userLogin.username;
        req.session.userLogin = true;
        // res.send(`${userLogin} loged in`)
        console.log('user loged in');
      } else {
        // redirect to login
        // res.redirect()
        console.log(next);
      }
    } else {
      // redirect to login
      // res.redirect()
    }
  } catch (err) {
    next(err);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  // set logout route
  res.redirect('');
});

module.exports = router;
