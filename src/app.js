const express = require('express');
const app = express();
const port = 5000;

const pageRouter = require('./routers');

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use('/styles', express.static(`${__dirname}/styles`));
app.use('/script', express.static(`${__dirname}/script`));
app.use(pageRouter);

app.listen(port, () => {
  console.log(`${port} is listening`);
});
