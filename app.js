const express = require('express');
const path = require('path');

const mainRouter = require('./src/routers/main');
const joinRouter = require('./src/routers/join');
const loginRouter = require('./src/routers/login');

const app = express();
const port = process.env.PORT || 5000;

const db = require('./src/db');

app.set('views', `${__dirname}/src/views`);
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/assets', express.static(`${__dirname}/assets`));
app.use(express.static('src'));
app.use('/node_modules', express.static(path.join(__dirname, `./node_modules/@fortawesome/fontawesome-free/`)));

app.use(
  session({
    secret: '#KFg$g!$KT9U}BY',
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 1000 * 60 * 60 * 60,
    },
  })
);

app.use(mainRouter);
app.use(joinRouter);
app.use(loginRouter);

app.listen(port, () => {
  console.log(`${port} is listening`);
});
