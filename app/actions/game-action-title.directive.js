(function () {
    'use strict';

    angular.module('game')
        .directive('gameActionTitle', gameActionTitleDirective);

    function gameActionTitleDirective() {
        return {
            restrict: 'E',
            templateUrl: './app/actions/game-action-title.template.html',
            scope: {
                action: '='
            },
            controller: ['Action', gameActionTitleController],
            controllerAs: 'actionCtrl'
        }
    }

    function gameActionTitleController(Action) {
        // var controller = Action;
        // console.log(controller);
    }

})();