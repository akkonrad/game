(function () {
    'use strict';

    angular.module('game')
        .directive('gameAction', gameActionDirective);

    function gameActionDirective() {
        return {
            restrict: 'E',
            templateUrl: './app/actions/game-action.template.html',
            scope: {
                action: '=',
                total_amount: '='
            },
            replace: true,
            controller: ['Action', 'Stats', gameActionController],
            controllerAs: 'actionCtrl'
        }
    }

    function gameActionController(Action, Stats) {
        var controller = this;

        controller.performAction = function(action) {

            if (Action.valiadatePerform(action)) {
                Action.performAction(action);
            }
        }
    }
})();