(function () {
    'use strict';
    
    angular.module('game')
        .directive('gameItems', ['Item', gameItemsDirective]);

    function gameItemsDirective() {
        return {
            restrict: 'E',
            templateUrl: './app/items/game-items.template.html',
            scope: {
                item: '='
            },
            controller: ['Item', gameItemsController],
            controllerAs: 'itemsCtrl'
        }
    }

    function gameItemsController(Item) {
        var controller = this;
        controller.items = Item.all().reverse();
        controller.greaterThan = function (prop, val) {
            return prop >= val;
        }
    }
})();
