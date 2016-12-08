/**
 * Created by Shrey on 12/1/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('./player');

var playerHistorySchema = new Schema({
    playerName: {type: String, ref: 'player'},
    date: {type: Date},

    floors: {type: Number},
    steps: {type: Number},
    calories: {type: Number},
    distance: {type: Number},
    averageHeartRate: {type: Number},


    walkFrequency:{type: Number},
    weightFrequency:{type: Number},
    runFrequency:{type: Number},

    walkIntensity:{type: Number},
    weightIntensity:{type: Number},
    runIntensity:{type: Number},

    walkTenacity:{type: Number},
    weightTenacity:{type: Number},
    runTenacity:{type: Number},

    walkEffectiveness:{type: Number},
    weightEffectiveness:{type: Number},
    runEffectiveness:{type: Number},

    frequencyIndex: {type: Number},
    intensityIndex: {type: Number},
    tenacityIndex: {type: Number},
    effectivenessIndex: {type: Number},

    averageIndex: {type: Number}
});

var playerHistory = mongoose.model('playerHistory', playerHistorySchema);

module.exports = playerHistory;
