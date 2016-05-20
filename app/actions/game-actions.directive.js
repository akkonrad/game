(function () {
    'use strict';

    angular.module('game')
        .directive('gameActions', function () {
            return {
                restrict: 'E',
                templateUrl: 'app/actions/game-actions.template.html',
                scope: {
                    items: '='
                },
                controller: function () {

                }
            }
        });
})();