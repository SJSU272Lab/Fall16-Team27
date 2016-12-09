/**
 * Created by Shrey on 12/8/2016.
 */

var Intensity=require('../model/intensity');
var mongoose = require('mongoose');

var ObjectId=require('mongodb').ObjectID;

exports.addIntensity=function(request,response)
{
    console.log("in addIntensity");

    var newIntensity=new Intensity();
    newIntensity.playerId= mongoose.Types.ObjectId('5849d3375506fe2f00c19110');
    newIntensity.date= Date.now();
    newIntensity.runningIntensityPoint=80;
    newIntensity.weightingIntensityPoint=65;
    newIntensity.avgCaloriesRate=200;
    newIntensity.avgDistanceRate=7;
    console.log(newIntensity);

    newIntensity.save(function(err,result){
        console.log(err);
        response.send(result);
    });

}

exports.getWeightingIntensityData=function(request,response)
{

    /*Sample JSON Output of weightingIntensityPoint
     [{"_id":"5849e767f392af00e0b31e95","weightingIntensityPoint":35},
     {"_id":"5849e7e516d1eb40a0f6ff49","weightingIntensityPoint":45},
     {"_id":"5849e8fc0f12d937a86cde4b","weightingIntensityPoint":55},
     {"_id":"5849e931dac0a014dcb8efce","weightingIntensityPoint":45},
     {"_id":"5849e9625a13b340cce73c27","weightingIntensityPoint":65}]
*/
    console.log("in weightingIntensityPoint");

    Intensity.find({},'weightingIntensityPoint',function (err,intensity)
    {
        if(err)
            console.log(err);
        console.log(intensity);
        response.send(intensity);
    });

}


exports.getRunningIntensityData=function(request,response)
{

    /*Sample JSON Output of getRunningIntensityData
     [{"_id":"5849e767f392af00e0b31e95","runningIntensityPoint":20},
     {"_id":"5849e7e516d1eb40a0f6ff49","runningIntensityPoint":30},
     {"_id":"5849e8fc0f12d937a86cde4b","runningIntensityPoint":50},
     {"_id":"5849e931dac0a014dcb8efce","runningIntensityPoint":60},
     {"_id":"5849e9625a13b340cce73c27","runningIntensityPoint":80}]

     */
    console.log("in getRunningIntensityData");

    Intensity.find({},'runningIntensityPoint',function (err,intensity)
    {
        if(err)
            console.log(err);
        console.log(intensity);
        response.send(intensity);
    });

}

exports.getAvgCaloriesRateData=function(request,response)
{

    /*Sample JSON Output of weightingIntensityPoint
     [{"_id":"5849e767f392af00e0b31e95","avgCaloriesRate":200},
     {"_id":"5849e7e516d1eb40a0f6ff49","avgCaloriesRate":140},
     {"_id":"5849e8fc0f12d937a86cde4b","avgCaloriesRate":180},
     {"_id":"5849e931dac0a014dcb8efce","avgCaloriesRate":170},
     {"_id":"5849e9625a13b340cce73c27","avgCaloriesRate":200}]
     */
    console.log("in avgCaloriesRate");

    Intensity.find({},'avgCaloriesRate',function (err,intensity)
    {
        if(err)
            console.log(err);
        console.log(intensity);
        response.send(intensity);
    });

}


exports.getAvgDistanceRateData=function(request,response)
{

    /*Sample JSON Output of weightingIntensityPoint
     [{"_id":"5849e767f392af00e0b31e95","avgDistanceRate":7},
     {"_id":"5849e7e516d1eb40a0f6ff49","avgDistanceRate":6},
     {"_id":"5849e8fc0f12d937a86cde4b","avgDistanceRate":8},
     {"_id":"5849e931dac0a014dcb8efce","avgDistanceRate":9},
     {"_id":"5849e9625a13b340cce73c27","avgDistanceRate":7}]
     */
    console.log("in getAvgDistanceRateData");

    Intensity.find({},'avgDistanceRate',function (err,intensity)
    {
        if(err)
            console.log(err);
        console.log(intensity);
        response.send(intensity);
    });

}
