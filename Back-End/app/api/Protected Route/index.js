/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const session = require('express-session');

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  unset: 'destroy',
  saveUninitialized: true,
  cookie: {
    secure: false,
    user: 'user',
  },
}));

const requireRole = (role) => function requester(req, res, next) {
  if (req.session.cookie.user === role) {
    next();
  } else {
    res.send(403);
  }
};

router.get('/getpassword/:cryptedpassword', requireRole('user'), (req, res) => {
  try {
    res.send(`${req.params.cryptedpassword}4`);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
