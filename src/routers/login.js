const express = require('express');
const loginRouter = express.Router();

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

const user1 = { id: 'ag502', password: '123' };
const user2 = { id: 'test', password: '111' };

loginRouter.post('/login', async (req, res) => {
  const { id, password } = req.body;
  if (id === user1.id && password === user1.password) {
    req.session.userId = id;
    req.session.save(function () {
      // res.redirect('/');
    });
  } else {
    res.status(401).send({ message: 'Unauthorized User' });
  }
});

module.exports = loginRouter;
