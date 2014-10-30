angular.module('ngeurope', ['ngRoute', 'ngMaterial', 'ngAnimate', 'Restangular']);

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

angular.module('ngeurope').config(function(RestangularProvider, baseUrl) {
    RestangularProvider.setBaseUrl(baseUrl);
    RestangularProvider.setSelfLinkAbsoluteUrl(false);
    RestangularProvider.setRestangularFields({
        selfLink: "_links.self.href"
    });
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        // .. to look for getList operations
        if (operation === "getList") {
            return data.items;
        }
        return data;
    });
});
