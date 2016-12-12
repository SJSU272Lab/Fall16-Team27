

var FitbitApiClient = require("../fitbitLib/fitbit-api-client"),
    client = new FitbitApiClient("227WYS", "49e37cc3990bac64980a90802e9c5cf0");
var Player=require('../model/player');
var Intensity=require('../model/intensity');
var Tenacity=require('../model/tenacity');
var Frequency=require('../model/frequency');

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


exports.frequentActivity=function (request,response)
{
    client.get("/activities/frequent.json", request.session.access_token).then(function (results)
    {
        console.log(results[0]);
        response.send({result:results[0]});
    });

}

exports.activity=function (request,response)
{
    var date=request.param("date");

    client.get("/activities/date/"+date+".json", request.session.access_token).then(function (results)
    {
        console.log(results[0]);
        response.send({result:results[0]});
    });

}
exports.dailySteps=function (request,response)
{

    client.get("/activities/steps/date/today/1m.json", request.session.access_token).then(function (results)
    {
        console.log(results[0]);
        response.send({result:results[0]});
    });

};
exports.getFoodLog=function (request,response)
{
    var date=request.param("date");
    client.get("/foods/log/date/"+date+".json", request.session.access_token).then(function (results)
    {
        console.log(results[0]);
        response.send({result:results[0]});
    });

}

exports.heartrate=function (request,response)
{

    client.get("/activities/heart/date/today/1d.json", request.session.access_token).then(function (results)
    {
        console.log(results[0]);
        response.send({result:results[0]});
    });

}
exports.intradayHeartRate=function (request,response)
{
    var date=request.param("date");
    var detailLevel=request.param("detailLevel");
    var start=request.param("start");
    var end=request.param("end");


    client.get("/activities/heart/date/"+date+"/1d/"+detailLevel+"/time/"+start+"/"+end+".json", request.session.access_token).then(function (results)
    {
        console.log(results[0]);
        response.send({result:results[0]});
    });
}

setInterval(function ()
{
    Player.find({},function (err,players)
    {
       if(err)
           console.log(err);
        else
       {
           for(var i=0;i<players.length;i++)
           {
               client.get(players[i].encodedId+"/friends.json", request.session.access_token).then(function (results)
               {
                   console.log(results[0]);
                   addPlayerIntensityData(players[i]._id);
                   addPlayerFrequencyData(players[i]._id);
                   addPlayerTenacityData(players[i]._id);

               });
           }
       }
    });

}, 1000 * 60 * 60 * 24);


function addPlayerIntensityData(playerId)
{

    client.get(players[i].encodedId+"/activities/95001/date/today/1d.json", request.session.access_token).then(function (result)
    {
        var newIntensityData=new Intensity();
        newIntensityData.avgDistanceRate=result.averageDistance;
        newIntensityData.avgCaloriesRate=result.calories/result.noActivities;
        if(result.weightSteps<=100)
            newIntensityData.weightingIntensityPoint=5;
        if(result.weightSteps>100&&result.weightSteps<200)
            newIntensityData.weightingIntensityPoint=10;
        if(result.weightSteps>200&&result.weightSteps<300)
            newIntensityData.weightingIntensityPoint=15;
        if(result.weightSteps>300&&result.weightSteps<400)
            newIntensityData.weightingIntensityPoint=20;
        if(result.weightSteps>400)
            newIntensityData.weightingIntensityPoint=25;

        if(result.runningSteps<=3000)
            newIntensityData.runningIntensityPoint=5;
        if(result.runningSteps>3000&&result.runningSteps<4500)
            newIntensityData.runningIntensityPoint=10;
        if(result.runningSteps>4500&&result.runningSteps<6000)
            newIntensityData.runningIntensityPoint=15;
        if(result.runningSteps>6000&&result.runningSteps<7500)
            newIntensityData.runningIntensityPoint=20;
        if(result.runningSteps>7500)
            newIntensityData.runningIntensityPoint=25;

        newIntensityData.playerId=playerId;
        newIntensityData.date=Date.now();
        newIntensityData.save(function (err,result)
        {
            if(!err)
                console.log("Player intensity added for player:"+playerId);
        });
    });

}

function addPlayerFrequencyData(playerId)
{
    client.get(players[i].encodedId+"/activities/date/today/1d.json", request.session.access_token).then(function (result)
    {
        var newFrequencyData=new Frequency();
        newFrequencyData.noOfRunActivity=result.activities.runs.length;
        newFrequencyData.noOfWeightActivity=result.activities.weight.length;
        if(result.activities.runs=1)
            newFrequencyData.runningFrequencyPoint=10;
        if(result.activities.runs=2)
            newFrequencyData.runningFrequencyPoint=15;
        if(result.activities.runs=3)
            newFrequencyData.runningFrequencyPoint=20;
        if(result.activities.runs=4)
            newFrequencyData.runningFrequencyPoint=25;
        if(result.activities.runs>=5)
            newFrequencyData.runningFrequencyPoint=30;

        if(result.activities.weight=1)
            newFrequencyData.weightingFrequencyPoint=10;
        if(result.activities.weight=2)
            newFrequencyData.weightingFrequencyPoint=15;
        if(result.activities.weight=3)
            newFrequencyData.weightingFrequencyPoint=20;
        if(result.activities.weight=4)
            newFrequencyData.weightingFrequencyPoint=25;
        if(result.activities.weight>=5)
            newFrequencyData.weightingFrequencyPoint=30;

        newFrequencyData.playerId=playerId;
        newFrequencyData.date=Date.now();
        newFrequencyData.save(function (err,result)
        {
            if(!err)
                console.log("Player frequency added for player:"+playerId);
        });
    });

}

function addPlayerTenacityData(playerId)
{
    client.get(players[i].encodedId+"/activities/95001/date/today/1d.json", request.session.access_token).then(function (result)
    {
        var newTenacityData=new Tenacity();
        newTenacityData.runningSteps=result.runningSteps;
        newTenacityData.weightingSteps=result.weightSteps;
        if(result.weightSteps<=100)
            newTenacityData.weightingTenacityPoint=5;
        if(result.weightSteps>100&&result.weightSteps<200)
            newTenacityData.weightingTenacityPoint=10;
        if(result.weightSteps>200&&result.weightSteps<300)
            newTenacityData.weightingTenacityPoint=15;
        if(result.weightSteps>300&&result.weightSteps<400)
            newTenacityData.weightingTenacityPoint=20;
        if(result.weightSteps>400)
            newTenacityData.weightingTenacityPoint=25;

        if(result.runningSteps<=3000)
            newTenacityData.runningTenacityPoint=5;
        if(result.runningSteps>3000&&result.runningSteps<4500)
            newTenacityData.runningTenacityPoint=10;
        if(result.runningSteps>4500&&result.runningSteps<6000)
            newTenacityData.runningTenacityPoint=15;
        if(result.runningSteps>6000&&result.runningSteps<7500)
            newTenacityData.runningTenacityPoint=20;
        if(result.runningSteps>7500)
            newTenacityData.runningTenacityPoint=25;

    });
}