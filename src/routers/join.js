const express = require('express');
const joinRouter = express.Router();

joinRouter.get('/join/agree', async (req, res) => {
  try {
    res.render('join_agree', { title: '가입 약관 동의' });
  } catch (error) {
    console.error(error);
  }
});

joinRouter.get('/join/certification', async (req, res) => {
  try {
    res.render('join_certification', { title: '휴대번호 인증' });
  } catch (error) {
    console.error(error);
  }
});

joinRouter.get('/join/userinfo', async (req, res) => {
  try {
    res.render('join_userinfo', { title: '회원 정보 입력' });
  } catch (error) {
    console.error(error);
  }
});

module.exports = joinRouter;
