(function () {
    'use strict';

    angular.module('game')
        .directive('gameActionIcon', gameActionIconDirective);

    function gameActionIconDirective() {
        return {
            restrict: 'E',
            templateUrl: './app/actions/game-action-icon.template.html',
            scope: {
                action: '='
            },
            controller: ['Action', gameActionIconController],
            controllerAs: 'actionCtrl'
        }
    }

    function gameActionIconController(Action) {
        // var controller = Action;
        // console.log(controller);
    }

})();