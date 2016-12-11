var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    playerName    : {type: String},
    height    : {type: Number},
    weight       : {type: Number},
    age       : {type: Number},
    intensityRank       : {type: Number},
    frequencyRank       : {type: Number},
    tenacityRank       : {type: Number},
    imageUrl:{type:String}


});

var player = mongoose.model('player', playerSchema);

module.exports = player;