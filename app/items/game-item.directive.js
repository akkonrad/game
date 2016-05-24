(function () {
    'use strict';
    
    angular.module('game')
        .directive('gameItem', gameItemDirective);

    function gameItemDirective() {
        return {
            restrict: 'E',
            templateUrl: './app/items/game-item.template.html',
            scope: {
                item: '=',
                total_amount: '='
            },
            replace: true,
            transclude: true,
            controller: ['Item', 'Stats', gameItemController],
            controllerAs: 'itemCtrl'
        }
    }

    function gameItemController(Item, Stats) {
        var controller = this;
        controller.upgrade = function (item) {
            if (item.upgrade_cost <= Stats.getTotalAmount() && item.active == 1) {
                Item.upgrade(item);
                Stats.spendMoney(item.upgrade_cost);
            }
        }
    }
})();