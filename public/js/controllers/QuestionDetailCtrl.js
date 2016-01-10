var questionDetailController = angular.module('questionDetailController', []);

    // inject the Question service factory into our controller
    questionDetailController.controller('QuestionDetailCtrl', ['$scope','$http','Questions', 'Answers', '$routeParams', function($scope, $http, Questions, Answers, $routeParams) {
        $scope.formData = {};
        $scope.loading = true;
        var question_id = $routeParams.question_id;

        var getOneQuestion = function(question_id) {
            Questions.getOne(question_id)
                .success(function (data) {
                    $scope.question = data;
                    $scope.loading = false;
                })
                .error(function (data) {
                    console.log('Error in getting one questions: ' + question_id);
                });
        };

        getOneQuestion(question_id);

        Answers.get(question_id)
            .success(function(data) {
                console.log(data);
                $scope.answers = data;
                $scope.loading = false;
            })
            .error(function(answer_data) {
                console.log('Error in getting answers for question id: ' + question_id);
            });

        $scope.upVoteOne = function(question_id) {
            $scope.loading = true;

            Questions.upVoteOne(question_id)
                .success(function(data) {
                    $scope.question = data;
                    $scope.loading = false;
                })
                .error(function(data) {
                    console.log('Error in up-voting question: ' + id);
                });
        }

        $scope.postAnswer = function(question_id) {
            if ($scope.formData.text != undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                Answers.create(question_id, $scope.formData)

                    // if successful creation, call our get function to get all the new Questions
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.answers = data; // assign our new list of Questions
                        getOneQuestion(question_id);
                    });
            }
        }
    }]);
