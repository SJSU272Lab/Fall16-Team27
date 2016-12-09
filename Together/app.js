var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var http = require('http')
var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var mongoStore = require("connect-mongo")(session);

var mongo = require("mongodb").MongoClient;
var frequency=require('./routes/frequency');

var mongo=require('./model/mongoconnect');



var user = require('./routes/user');
var home=require('./routes/home');
var players=require('./routes/players');
var intensity=require('./routes/intensity');
var tenacity=require('./routes/tenacity');



var app = express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    store: new mongoStore({
        url: "mongodb://fitbit:ranjan123@ds153677.mlab.com:53677/together"
    })
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.get('/home',function (req,res) {
  res.sendfile('./public/sidebar.html', { title: 'Express',body:"" });
})
//app.get('/',home.authorize);
app.get('/home',home.home);
app.get('/friendsLeaderBoard',home.friendsLeaderBoard);
app.get('/getWaterLog',home.getWaterLog);
app.get('/frequentActivity',home.frequentActivity);
app.get('/activity',home.activity);
app.get('/dailySteps',home.dailySteps);
app.get('/getFoodLog',home.getFoodLog);
app.get('/getRunningIntensityData',intensity.getRunningIntensityData);
app.get('/getWeightingIntensityData',intensity.getWeightingIntensityData);
app.get('/getAvgCaloriesRateData',intensity.getAvgCaloriesRateData);
app.get('/getAvgDistanceRateData',intensity.getAvgDistanceRateData);

app.get('/addTenacity',tenacity.addTenacity);

app.get('/getRunningTenacityData',tenacity.getRunningTenacityData);
app.get('/getWeightingTenacityData',tenacity.getWeightingTenacityData);

app.get('/heartrate',home.heartrate);

app.get('/intradayHeartRate',home.intradayHeartRate);


app.post('/authorize',home.authorize);

app.post('/authenticate',user.authenticate);
app.get('/getPlayers',players.getPlayers);
app.get('/addPlayer',players.addPlayer);

app.get('/getWeeklyRunActivityCount',frequency.getWeeklyRunActivityCount);
app.get('/getWeeklyWeightActivityCount',frequency.getWeeklyWeightActivityCount);
app.get('/addFrequencyData',frequency.addFrequencyData);

app.get('/addIntensity',intensity.addIntensity);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
