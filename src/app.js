const express = require('express');
const app = express();
const port = 5000;

const pageRouter = require('./routers');

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(pageRouter);

app.listen(port, () => {
  console.log(`${port} is listening`);
});
