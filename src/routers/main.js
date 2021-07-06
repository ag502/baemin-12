const express = require('express');
const mainRouter = express.Router();

mainRouter.get('/', async (req, res) => {
  try {
    res.render('main', { title: 'Main' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = mainRouter;
