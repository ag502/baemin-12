const express = require('express');
const loginRouter = express.Router();

loginRouter.get('/login', async (req, res) => {
  try {
    res.render('login', { title: '로그인' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = loginRouter;
