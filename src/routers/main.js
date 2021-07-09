const express = require('express');
const mainRouter = express.Router();

mainRouter.get('/', async (req, res) => {
  try {
    res.render('main', { title: '메인', session: req.session?.userId });
  } catch (error) {
    console.error(error);
  }
});

module.exports = mainRouter;
