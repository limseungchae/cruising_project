const express = require('express');
const path = require('path');
const logger = require('morgan');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const oracledb = require('./models/Oracle');

const mainRouter = require('./routes/main');
const memRouter = require('./routes/mem');
const detailRouter = require('./routes/detail');
const passport = require("passport");
const passportConfig = require('./passport');

const app = express();
passportConfig(); // 패스포트 설정
const port = process.env.PORT || 4000;

app.engine('hbs', engine({
  extname: '.hbs', defaultLayout: 'layout',
  helpers: require('./helpers/handlebars-helper'),
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const maxAge = 1000 * 30;
const sessionObj = {
  resave: false, saveUninitialized: false,
  secret: 'process.env.COOKIE_SECRET',
  cookie: { httpOnly: true, secure: false },
  name: 'session-cookie',
  maxAge: maxAge
};
app.use(session(sessionObj));





app.use(express.static(path.join(__dirname, 'static')));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
oracledb.initConn();

app.use(function(req, res, next){
  res.locals.session = req.session;
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', mainRouter);
app.use('/member', memRouter);
app.use('/detail', detailRouter);

app.use((req, res) => {
  res.status(404);
  res.send('404-페이지가 없어요!');
});
app.use((err, req, res, next) => {
  console.log(err);   // 오류메세지 출력
  res.status(500);
  res.send('500-서버 내부 오류 발생했어요!');
});

app.listen(port, () => {
  console.log('SemiProjectV1 서버 실행중...');
});