const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.render('main', { title: 'Main' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
