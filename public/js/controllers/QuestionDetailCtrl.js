var questionDetailController = angular.module('questionDetailController', []);

    // inject the Question service factory into our controller
    questionDetailController.controller('QuestionDetailCtrl', ['$scope','$http','Questions', '$routeParams', function($scope, $http, Questions, $routeParams) {
        $scope.formData = {};
        $scope.loading = true;
        var question_id = $routeParams.question_id;

        Questions.getOne(question_id)
            .success(function(data) {
                $scope.question = data;
                $scope.loading = false;
            })
            .error(function(data) {
                console.log('Error in getting one questions: ' + question_id);
            });

        $scope.upVoteOne = function(id) {
            $scope.loading = true;

            Questions.upVoteOne(id)
                .success(function(data) {
                    $scope.question = data;
                    $scope.loading = false;
                })
                .error(function(data) {
                    console.log('Error in up-voting question: ' + id);
                });
        }
    }]);
