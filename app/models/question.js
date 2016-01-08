var mongoose = require('mongoose');

module.exports = mongoose.model('Question', {
    title : {type : String, default: ''},
    description : {type : String, default: ''},
    votes : {type : Number, default: 0},
    answer_num : {type : Number, default: 0}
});