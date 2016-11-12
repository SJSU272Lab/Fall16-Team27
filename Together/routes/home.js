/**
 * Created by Parth on 11-11-2016.
 */

var FitbitApiClient = require("../fitbitLib/fitbit-api-client"),
    client = new FitbitApiClient("227WYS", "49e37cc3990bac64980a90802e9c5cf0");

exports.authorize=function(request,response)
{
    var url=client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://localhost:3000/home');
// request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
    console.log(url);
    response.redirect(url);
}

exports.home=function (request, response) {
// exchange the authorization code we just received for an access token
    client.getAccessToken(request.query.code, 'http://localhost:3000/home').then(function (result)
    {
        request.session.access_token=result.access_token;
        // use the access token to fetch the user's profile information
        client.get("/profile.json", result.access_token).then(function (results) {

            console.log(results[0]);
            response.render('index', { title: 'Together after login',body:results[0] });
        });
    }).catch(function (error) {
        response.send(error);
    });
}

exports.friends=function(request,response)
{
    //console.log(request.session);

    client.get("/friends.json", request.session.access_token).then(function (results) {
            console.log(results[0].friends);
            response.send({result:results[0]});
    });

}


exports.friendsLeaderBoard= function (request, response)
{
       client.get("/friends/leaderboard.json", request.session.access_token).then(function (results)
        {
            console.log(results[0]);
            response.send({result:results[0]});
        });
}

exports.getWaterLog=function (request,response)
{
    var date=request.param("date");
    client.get("/foods/log/water/date/"+date+".json", request.session.access_token).then(function (results)
    {
        console.log(results[0]);
        response.send({result:results[0]});
    });

}