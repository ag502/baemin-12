const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 5000;

const mainRouter = require('./routers/main');
const joinAgreeRouter = require('./routers/join_agree');
const loginRouter = require('./routers/login');

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(
  session({
    secret: '#KFg$g!$KT9U}BY',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, '../assets/')));
app.use('/node_modules', express.static(path.join(__dirname, `../node_modules/@fortawesome/fontawesome-free/`)));
app.use('/styles', express.static(`${__dirname}/styles`));
app.use('/script', express.static(`${__dirname}/script`));

app.use(mainRouter);
app.use(joinAgreeRouter);
app.use(loginRouter);

app.listen(port, () => {
  console.log(`${port} is listening`);
});
