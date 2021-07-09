const express = require('express');
const session = require('express-session');
const LowdbStore = require('lowdb-session-store')(session);
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const mainRouter = require('./src/routers/main');
const joinRouter = require('./src/routers/join');
const loginRouter = require('./src/routers/login');

const app = express();
const port = process.env.PORT || 5000;

const adapter = new FileSync('session.json', { defaultValue: { session: [] }});
const db = lowdb(adapter);

app.set('views', `${__dirname}/src/views`);
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/assets', express.static(`${__dirname}/assets`));
app.use(express.static('src'));
app.use('/node_modules', express.static(`${__dirname}/node_modules/@fortawesome/fontawesome-free/`));

app.use(
  session({
    secret: '#KFg$g!$KT9U}BY',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60 * 60,
    },
    store: new LowdbStore(db.get('session'))
  })
);

app.use(mainRouter);
app.use(joinRouter);
app.use(loginRouter);

app.listen(port, () => {
  console.log(`${port} is listening`);
});
