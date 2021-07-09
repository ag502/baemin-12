const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const joinRouter = express.Router();
const db = require('../db');

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

joinRouter.post('/join/certification', async (req, res) => {
  try {
    const { optional } = req.body;
    if (optional) {
      if (typeof optional !== 'object') {
        req.session.optional = [optional];
      } else {
        req.session.optional = optional;
      }
      console.log(req.session.optional);
    }

    res.render('join_certification', { title: '휴대번호 인증' });
  } catch (error) {
    console.error(error);
  }
});

joinRouter.get('/join/userinfo', async (req, res) => {
  try {
    console.log(`req session 선택사항: ${req.session.optional}`);
    res.render('join_userinfo', { title: '회원 정보 입력' });
  } catch (error) {
    console.error(error);
  }
});

joinRouter.post('/join/userinfo', async (req, res) => {
  try {
    const { mail, nickname, password, birthday } = req.body;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      await db.get('users').push({ mail, nickname, password: hash, birthday }).write();
      console.log(mail, nickname, hash);
      res.redirect('/');
    });
  } catch (error) {
    console.error(error);
  }
});

joinRouter.get('/join/hasDuplicate', async (req, res) => {
  try {
    const mail = req.query.mail;
    const findUser = db.get('users').find({ mail }).value();
    res.send(findUser !== undefined);
  } catch (error) {
    console.error(error);
  }
});

module.exports = joinRouter;
