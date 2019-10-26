const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index.routes');
const adminRouter = require('./routes/admin.routes');

const app = express();

mongoose.connect('mongodb://nihi1anth:root@ds131729.mlab.com:31729/shoppingcart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));

// view engine setup
app.engine('hbs', exphbs({
  defaultLayout: 'layout',
  extname: 'hbs',
  helpers: require('./public/javascripts/helpers.js').helpers
}));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
