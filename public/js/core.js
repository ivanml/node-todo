var questionApp = angular.module('questionApp', ['ngRoute', 'questionListController', 'questionService', 'questionDetailController', 'answerService']);

questionApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
            templateUrl: '/views/questionList.html',
            controller: 'QuestionListCtrl'
        })

        .when('/questions/:question_id', {
            templateUrl: '/views/questionDetail.html',
            controller: 'QuestionDetailCtrl'
        })

        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);