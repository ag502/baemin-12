const express = require('express');
const joinAgreeRouter = express.Router();

joinAgreeRouter.get('/agree', async (req, res) => {
  try {
    res.render('join_agree', { title: '가입 약관 동의' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = joinAgreeRouter;
