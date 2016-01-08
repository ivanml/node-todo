var questionListController = angular.module('questionListController', []);

    // inject the Question service factory into our controller
    questionListController.controller('QuestionListCtrl', ['$scope','$http','Questions', function($scope, $http, Questions) {
        $scope.formData = {};
        $scope.loading = true;

        // GET =====================================================================
        // when landing on the page, get all Questions and show them
        // use the service to get all the Questions
        Questions.get()
            .success(function(data) {
                $scope.questions = data;
                $scope.loading = false;
            })
            .error(function(data) {
                console.log('Error in getting all questions: ' + data);
            });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.postQuestion = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.title != undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                Questions.create($scope.formData)

                    // if successful creation, call our get function to get all the new Questions
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.questions = data; // assign our new list of Questions
                    });
            }
        };

        // DELETE ==================================================================
        // delete a question
        $scope.deleteQuestion = function(id) {
            $scope.loading = true;

            Questions.delete(id)
                // if successful creation, call our get function to get all the new Questions
                .success(function(data) {
                    $scope.loading = false;
                    $scope.questions = data; // assign our new list of Questions
                });
        };

        $scope.upVote = function(id) {
            $scope.loading = true;

            Questions.upVote(id)
                .success(function(data) {
                    $scope.questions = data;
                    $scope.loading = false;
                })
                .error(function(data) {
                    console.log('Error in up-voting question: ' + id);
                });
        }
    }]);