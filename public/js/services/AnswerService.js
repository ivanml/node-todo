var answerService = angular.module('answerService', [])

// super simple service
// each function returns a promise object
answerService.factory('Answers', ['$http',function($http) {
    return {
        get : function(question_id) {
            console.log("service get answer called.");
            return $http.put('/api/answers/' + question_id);
        },
        getOne : function(id) {
            return $http.put('/api/answer/' + id);
        },
        create : function(question_id, answerData) {
            return $http.post('/api/answers/' + question_id, answerData);
        },
        delete : function(id) {
            return $http.delete('/api/answers/' + id);
        },
        upVote : function(id) {
            return $http.put('/api/upvote/' + id);
        },
        upVoteOne : function(id) {
            return $http.put('/api/upvote_one/' + id);
        }
    }
}]);