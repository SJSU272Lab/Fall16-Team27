/**
 * Created by Shrey on 12/8/2016.
 */

var mongoose = require('mongoose');
var Player=require('../model/player');
var Tenacity=require('../model/tenacity');
var HashMap=require('hashmap');

exports.addTenacity=function(request,response)
{
    var makeDate = new Date();
    makeDate = new Date(makeDate.setDate(makeDate.getDate() - 7));
    var playerId=[];
    playerId.push('5849d2a526a28b14c836b2dd');
    playerId.push('5849d28bbbeb673650d179fa');
    playerId.push('5849d20172f2912e1cf0461e');
    playerId.push('5849d1915556b84c744f599c');
    playerId.push('5849d3375506fe2f00c19110');

    for(var i=0;i<playerId.length;i++)
    {

        var newTenacityData=new Tenacity();
        newTenacityData.playerId=mongoose.Types.ObjectId(playerId[i]);
        newTenacityData.date=Date.parse(makeDate);
        newTenacityData.runningTenacityPoint=100;
        newTenacityData.weightingTenacityPoint=80;
        newTenacityData.runningSteps=6000;
        newTenacityData.weightingSteps=40;
        newTenacityData.save(function (err,result)
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