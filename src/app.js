const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

const pageRouter = require('./routers/main');
const joinRouter = require('./routers/join');
const loginRouter = require('./routers/login');

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use('/assets', express.static(path.join(__dirname, '../assets/')));
app.use('/node_modules', express.static(path.join(__dirname, `../node_modules/@fortawesome/fontawesome-free/`)));
app.use('/styles', express.static(`${__dirname}/styles`));
app.use('/script', express.static(`${__dirname}/script`));

app.use(pageRouter);
app.use(joinRouter);
app.use(loginRouter);

app.listen(port, () => {
  console.log(`${port} is listening`);
});
