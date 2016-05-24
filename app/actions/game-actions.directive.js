(function () {
    'use strict';

    angular.module('game')
        .directive('gameActions', ['Action', gameActionsDirective]);


    function gameActionsDirective() {
        return {
            restrict: 'E',
            templateUrl: './app/actions/game-actions.template.html',
            scope: {
                actions: '='
            },
            controller: ['Action', gameActionsController],
            controllerAs: 'actionsCtrl'
        }
    }

    function gameActionsController(Action) {
        var controller = this;
        controller.actions = Action.all().reverse();
        controller.greaterThan = function (prop, val) {
            return prop >= val;
        }
    }
})();
