(function() {

    class Baconator {
        constructor($http) {
            this.$http = $http;
            this.url = 'https://baconator-bacon-ipsum.p.mashape.com/?type=all-meat';
            this.headers = {
                "X-Mashape-Key": "x"
            };
        }

        baconize(paras=25, sentences=15) {
            var headers = this.headers;
            var params = {paras, sentences};
            return this.$http.get(this.url, {headers, params});
        }
    }

    class ToDoItem {
        constructor(who, what, notes) {
            this.who = who;
            this.what = what;
            this.notes = notes;
            this.face = 'img/60.jpeg';
            this.done_ = false;
        }

        markAsDone() { this.done_ = true; }
        get isDone() { return this.done_; }
        get done() { return this.done_; }
    }

    class HomeController {
        constructor($log, Baconator) {
            this.todos = [];
            Baconator.baconize().success(data => {
                data.forEach(item => {
                    this.todos.push(
                        new ToDoItem(
                            item.split(' ')[0].toUpperCase(),
                            item.split(' ')[1] + ' ' + item.split(' ')[2],
                            item));
                })
            });
        }
    }

    angular.module('ngeurope').service('Baconator', Baconator);
    angular.module('ngeurope').controller('HomeController', HomeController);
})();