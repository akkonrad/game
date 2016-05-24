(function () {
    'use strict';

    angular.module('game')
        .directive('gameActionRequires', gameActionRequiresDirective);

    function gameActionRequiresDirective() {
        return {
            restrict: 'E',
            templateUrl: './app/actions/game-action-requires.template.html',
            scope: {
                action: '='
            },
            controller: ['Action', gameActionRequiresController],
            controllerAs: 'actionCtrl'
        }
    }

    function gameActionRequiresController(Action) {
        var controller = this;
    }

})();
