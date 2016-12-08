/**
 * Created by Shrey on 12/1/2016.
 */
var player = require('../models/player');
var playerHistory = require('../models/playerHistory');

var FitbitApiClient = require("../fitbitLib/fitbit-api-client"),
    client = new FitbitApiClient("227Y5W", "d3147ca5060c4d920e3e3bc2050953f0");


exports.getPlayers=function(request,response)
{
    client.get("/friends.json", request.session.access_token).then(function (results) {
        console.log(results[0]);

    var data=[];
        for(i=0;i<=results.length;i++) {
            var player=
                {
                    playerName:results[0].friends[i].user.displayName,
                    avatar:results[0].friends[i].user.avatar,
                    weight:results[0].friends[i].user.weight,
                    height:results[0].friends[i].user.height,
                    gender:results[0].friends[i].user.gender
                }
                data.push(player);
            console.log(data);
        }

                response.send(data);
    });


}

exports.getAverageIndex=function(request,response)
{
    console.log("in getAverageIndex");

    var ph = new playerHistory();

    ph.find({},'averageIndex', function(err, points) {
        if (err) {
            console.log("error in fetching data");
        }
        else{
            if(points.length > 0){

                console.log("points"+points);
                response.send(points);

            }
            else{

                console.log("error in fetching data");

            }

        }
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

exports.heartrate=function (request,response)
{

    client.get("/activities/heart/date/today/1d.json", request.session.access_token).then(function (results)
    {
        console.log(results[0]);
        response.send({result:results[0]});
    });

}



