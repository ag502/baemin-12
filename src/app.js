const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const pageRouter = require('./routers/main');
const joinRouter = require('./routers/join');
const loginRouter = require('./routers/login');

const app = express();
const port = 5000;

const FileStore = require('session-file-store')(session);

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '../assets/')));
app.use('/node_modules', express.static(path.join(__dirname, `../node_modules/@fortawesome/fontawesome-free/`)));
app.use('/styles', express.static(`${__dirname}/styles`));
app.use('/script', express.static(`${__dirname}/script`));

app.use(
  session({
    // store: new FileStore(),
    secret: '#KFg$g!$KT9U}BY',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(mainRouter);
app.use(joinRouter);
app.use(loginRouter);

app.listen(port, () => {
  console.log(`${port} is listening`);
});
