var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var guRouter = require('./routes/gu') 
var manageRouter = require('./routes/manage')

var app = express();
app.use(cors({
  origin:'http://localhost:8080',
  credentials:true
}))

app.use(session({
  secret:"keyboard cat",
  resave:true,
  saveUninitialized:false,
  cookie:{
    maxAge:86400000
  }
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gu',guRouter)
app.use('/manage',manageRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.set('basePath',__dirname)
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err.message)
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
