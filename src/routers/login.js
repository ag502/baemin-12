const express = require('express');
const loginRouter = express.Router();

loginRouter.get('/login', async (req, res) => {
  try {
    if (req.session.id) {
      console.log(req.session.id);
      req.session.destroy();
    }
    res.render('login', { title: '로그인' });
  } catch (error) {
    console.log(error);
  }
});

const dummyAcount = { id: 'ag502', password: '123' };

loginRouter.post('/login', async (req, res) => {
  const { id, password } = req.body;
  if (id === dummyAcount.id && password === dummyAcount.password) {
    req.session.id = id;
    req.session.save(() => {
      res.redirect('/');
    });
  } else {
    res.send();
  }
});

module.exports = loginRouter;
