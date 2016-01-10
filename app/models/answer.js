var mongoose = require('mongoose');

module.exports = mongoose.model('Answer', {
    question_id : {type : String, default: ''},
    text : {type : String, default: ''},
    votes : {type : Number, default: 0}
});