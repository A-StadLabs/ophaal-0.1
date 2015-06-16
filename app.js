

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');


var app = express();

// view engine setup

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// HIER DUS WA APIS AANSPREKEN
// Search voor infofiches
app.get('/adres', function(req, res){
  var street = req.query.street;
  var postal = req.query.postal;
  //req.session.userobject;
  request.get({url: 'http://www.ophaalkalender.be/calendar/findstreets?query='+street+'&zipcode='+postal }, function(error, response, body){
      res.send(body);
  });
});

//http://www.ophaalkalender.be/calendar/findstreets?query=g&zipcode=2050


// Get rides
//http://www.ophaalkalender.be/api/rides?id=100442&housenumber=0&start=1433109600&end=1436738400&_=1434456216844
app.get('/rides', function(req, res){
  var id = req.query.id;
  var housenumber = req.query.housenumber;
  //req.session.userobject;
  request.get({url: 'http://www.ophaalkalender.be/api/rides?id='+id+'&housenumber='+housenumber+'&start=1433109600&end=1436738400&_=1434456216844' }, function(error, response, body){
      res.send(body);
  });
});

/// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

module.exports = app;
