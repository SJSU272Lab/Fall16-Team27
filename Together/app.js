
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var FitbitApiClient = require("./fitbit-api-client"),
client = new FitbitApiClient("227WYS", "49e37cc3990bac64980a90802e9c5cf0");

//redirect the user to the Fitbit authorization page
app.get("/authorize", function (req, res) {
// request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://localhost:3000/home'));
});

//handle the callback from the Fitbit authorization flow
app.get("/home", function (req, res) {
// exchange the authorization code we just received for an access token
client.getAccessToken(req.query.code, 'http://localhost:3000/home').then(function (result) {
    // use the access token to fetch the user's profile information
    client.get("/profile.json", result.access_token).then(function (results) {
      console.log(results[0]);
        res.render('index', { title: 'Together after login',body:results[0] });
    });
}).catch(function (error) {
    res.send(error);
});
});	
//app.get("/index",routes.index);

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
