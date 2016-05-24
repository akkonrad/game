(function () {
    'use strict';

    angular.module('game')
        .directive('gameActionDescription', gameActionDescriptionDirective);

    function gameActionDescriptionDirective() {
        return {
            restrict: 'E',
            templateUrl: './app/actions/game-action-description.template.html',
            scope: {
                action: '='
            },
            controller: ['Action', gameActionDescriptionController],
            controllerAs: 'actionCtrl'
        }
    }

    function gameActionDescriptionController(Action) {
        // var controller = Action;
        // console.log(controller);
    }

})();