const express = require('express');
const mainRouter = express.Router();

mainRouter.get('/', async (req, res) => {
  try {
    res.render('main', { title: '메인' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = mainRouter;
