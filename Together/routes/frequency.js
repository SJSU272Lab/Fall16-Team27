/**
 * Created by Parth on 08-12-2016.
 */

var mongoose = require('mongoose');
var Player=require('../model/player');
var Frequency=require('../model/frequency');
var HashMap=require('hashmap');

exports.getWeeklyRunActivityCount=function (request,response)
{
    var currentDate=new Date();
    var makeDate = new Date();
    makeDate = new Date(makeDate.setDate(makeDate.getDate() - 7));
    console.log(Date.parse(currentDate));
    console.log(Date.parse(makeDate));
    var resultMap=new HashMap();
    Frequency.find({})
    .where('date').gt(makeDate).lte(currentDate)
    .populate('playerId')
    .sort('playerId')
    .exec(function (err,result)
    {
       if(!err)
       {

           for(var i=0;i<result.length;i++)
           {
               if(resultMap.has(result[i].playerId.playerName))
               {
                   var tempArr=resultMap.get(result[i].playerId.playerName);
                   var tempObj=
                   {
                       date:result[i].date,
                       runningActivityCount:result[i].noOfRunActivity
                   }
                   tempArr.push(tempObj);
                   resultMap.remove(result[i].playerId.playerName)
                   resultMap.set(result[i].playerId.playerName,tempArr);
               }
               else
               {
                   var tempObj=
                   {
                       date:result[i].date,
                       runningActivityCount:result[i].noOfRunActivity
                   }
                   var tempArr=[];
                   tempArr.push(tempObj);
                   resultMap.set(result[i].playerId.playerName,tempArr);
               }

           }

           response.send(resultMap);
       }
        else
            response.send({failed:"failed"});
    });

};

exports.addFrequencyData=function(request,response)
{
    var makeDate = new Date();
    makeDate = new Date(makeDate.setDate(makeDate.getDate() - 1));
    var playerId=[];
    playerId.push('5849d2a526a28b14c836b2dd');
    playerId.push('5849d28bbbeb673650d179fa');
    playerId.push('5849d20172f2912e1cf0461e');
    playerId.push('5849d1915556b84c744f599c');

    for(var i=0;i<playerId.length;i++)
    {
        var newFrequenceData=new Frequency();
        newFrequenceData.playerId=mongoose.Types.ObjectId(playerId[i]);
        newFrequenceData.date=Date.parse(makeDate);
        newFrequenceData.runningFrequencyPoint=45;
        newFrequenceData.weightingFrequencyPoint=65;
        newFrequenceData.noOfWeightActivity=6;
        newFrequenceData.noOfRunActivity=4;
        newFrequenceData.save(function (err,result)
        {
            if(err)
            {
                console.log(err);
                response.send({statusCode:401});
            }
            else
            {
                console.log(result);

            }
        });
    }
    response.send({statusCode:200});

}