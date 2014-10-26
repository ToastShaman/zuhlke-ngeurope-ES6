(function() {
    class HomeController {
        constructor() {
            this.cardImage = 'http://loremflickr.com/320/240';
            this.todos = [];
            for (var i = 0; i < 15; i++) {
                this.todos.push({
                    face: 'img/60.jpeg',
                    what: 'Brunch this weekend?',
                    who: 'Min Li Chan',
                    notes: "I'll be in your neighborhood doing errands."
                });
            }
        }
    }
    angular.module('ngeurope').controller('HomeController', HomeController);
})();