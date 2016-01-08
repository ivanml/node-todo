var questionService = angular.module('questionService', [])

    // super simple service
    // each function returns a promise object
questionService.factory('Questions', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/api/questions');
            },
            getOne : function(id) {
                return $http.put('/api/question/' + id);
            },
            create : function(questionData) {
                return $http.post('/api/questions', questionData);
            },
            delete : function(id) {
                return $http.delete('/api/questions/' + id);
            },
            upVote : function(id) {
                return $http.put('/api/upvote/' + id);
            },
            upVoteOne : function(id) {
                return $http.put('/api/upvote_one/' + id);
            }
        }
    }]);
