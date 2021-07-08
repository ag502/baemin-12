const express = require('express');
const bcrypt = require('bcrypt');
const loginRouter = express.Router();
const db = require('../db');

loginRouter.get('/login', async (req, res) => {
  try {
    const { userId } = req.session;
    if (userId) {
      res.redirect('/');
    }
    res.render('login', { title: '로그인' });
  } catch (error) {
    console.log(error);
  }
});

loginRouter.post('/login', async (req, res) => {
  try {
    const { id, password } = req.body;

    const findValue = db.get('users').find({ mail: id }).value();
    if (!findValue) {
      res.status(401).send({ message: 'Unauthorized User' });
    } else {
      const { mail, password: findPw } = findValue;
      if (id === mail && bcrypt.compareSync(password, findPw)) {
        req.session.userId = id;
        req.session.save((err) => {
          res.status(200).send('success');
        });
      } else {
        res.status(401).send({ message: 'Unauthorized User' });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = loginRouter;
