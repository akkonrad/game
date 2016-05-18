var app = angular.module('game', []);

app.directive('gameActions', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/actions/actions.html',
        scope: {
            items: '='
        },
        controller: function() {

        }
    }
});
