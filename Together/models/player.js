/**
 * Created by Shrey on 12/1/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    playerName: {type: String},
    emailId: {type: String},
    password: {type: String},
    avatar: {type: String},
    weight: {type: Number},
    height: {type: Number},
    gender: {type: String}


});

var player = mongoose.model('player', playerSchema);

module.exports = player;