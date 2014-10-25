angular.module('ngeurope', ['ngRoute']);

angular.module('ngeurope').config(function ($routeProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: 'partials/home/home.html'
    })
    .otherwise({ redirectTo: '/home' });
});
