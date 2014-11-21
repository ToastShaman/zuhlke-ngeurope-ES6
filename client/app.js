angular.module('ngeurope', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngAria']);

// @if debug=='true'
angular.module('ngeurope').config(function($logProvider) {
    $logProvider.debugEnabled(true);
});
// @endif

angular.module('ngeurope').constant('baseUrl', '/* @echo baseUrl */');

angular.module('ngeurope').config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'partials/home/home.tpl.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
});
