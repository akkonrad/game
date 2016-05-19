angular.module('game', []);


function getItemsMockArray() {

    return [
        {
            name: "Name 1", // item name, displayed on
            level: 1,
            color: ['red', 'yellow', 'aqua', 'blue', 'light-blue', 'green', 'navy', 'teal', 'olive', 'lime', 'orange', 'fuchsia', 'purple', 'maroon', 'black'],
            picked_color: 'aqua',
            description: "lorem ipsum dolor sit amet",
            upgrade_cost: 4,
            current_income: 1,
            can_afford: 0,
            base_income: 1,
            requires: [],
            active: 1,
            timeout: 2,
            visible: {
                on: 1,
                visible_at: 0,
                enabled_at: 0
            },
            bonuses: [
                {
                    name: "some name for bonus, describe what it does, eg: 10 percent more for 10 seconds",
                    cooldown_seconds: 360,
                    duration: 10,
                    bonus_income: 0,
                    percentage: 10
                },
                {
                    name: "another bonus, get 100 gold",
                    cooldown_seconds: 360,
                    duration: 5,
                    bonus_income: 100,
                    percentage: 0
                }
            ]
        },
        {
            name: "Name 2",
            level: 0,
            color: ['red', 'yellow', 'aqua', 'blue', 'light-blue', 'green', 'navy', 'teal', 'olive', 'lime', 'orange', 'fuchsia', 'purple', 'maroon', 'black'],
            picked_color: 'olive',
            description: "lorem ipsum dolor sit amet",
            upgrade_cost: 18,
            can_afford: 0,
            active: 1,
            timeout: 6,
            current_income: 3,
            base_income: 3,
            requires: [
                "Item 1"
            ],
            visible: {
                on: 0,
                visible_at: 10,
                enabled_at: 10
            },
            bonuses: [
                {
                    name: "some name for bonus, describe what it does, eg: 10 percent more for 10 seconds",
                    cooldown_seconds: 360,
                    duration: 10,
                    bonus_income: 0,
                    percentage: 10
                },
                {
                    name: "another bonus, get 100 gold",
                    cooldown_seconds: 360,
                    duration: 5,
                    bonus_income: 100,
                    percentage: 0
                }
            ]
        },
        {
            name: "Name 3",
            level: 0,
            color: ['red', 'yellow', 'aqua', 'blue', 'light-blue', 'green', 'navy', 'teal', 'olive', 'lime', 'orange', 'fuchsia', 'purple', 'maroon', 'black'],
            picked_color: 'purple',
            description: "lorem ipsum dolor sit amet",
            upgrade_cost: 80,
            can_afford: 0,
            active: 1,
            timeout: 12,
            current_income: 15,
            base_income: 15,
            requires: [
                "Item 1",
                "Item 2"
            ],
            visible: {
                on: 0,
                visible_at: 30,
                enabled_at: 100
            },
            bonuses: [
                {
                    name: "some name for bonus, describe what it does, eg: 10 percent more for 10 seconds",
                    cooldown_seconds: 360,
                    duration: 10,
                    bonus_income: 0,
                    percentage: 10
                },
                {
                    name: "another bonus, get 100 gold",
                    cooldown_seconds: 360,
                    duration: 5,
                    bonus_income: 100,
                    percentage: 0
                }
            ]
        }
    ];
}
(function () {
    'use strict';
    
    angular.module('game')
        .factory('Item', ['$timeout', '$interval', ItemFactory]);

    function ItemFactory($timeout, $interval) {
        var items = getItemsMockArray();

        return {
            all: function () {
                return items;
            },
            upgrade: function (item) {

                // If item is active to upgrade
                item.active = 0;
                // Show progress
                item.current_progress = 0;

                $timeout(function () {
                    // Set item to active again.
                    item.active = 1;
                    // Upgrade cos formula, exponential
                    item.upgrade_cost = Math.round((item.upgrade_cost * 2 - item.upgrade_cost * 0.8) * 100) / 100;
                    // Linear upgrade
                    item.current_income = item.current_income + item.base_income;
                    // Current item level
                    item.level += 1;
                    item.current_progress = 0;
                }, item.timeout * 1000);

                item.timeleft = item.timeout - 1;
                var time_left = item.timeout - 1;

                $interval(function () {
                    item.current_progress += (100 / time_left);
                    item.timeleft--;
                }, 1000, item.timeout - 1);

                // callback game: do something
            },
            getTotalIncome: function () {
                var income = 0;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].level > 0) {
                        income = income + items[i].current_income;
                    }
                }

                return income;
            },
            updateVisibility: function (amount) {
                for (var i = 0; i < items.length; i++) {
                    // Whenever total amount reaches item visibility level, keep it visible for user.
                    if (items[i].visible.on == 0 && items[i].visible.visible_at <= amount) {
                        items[i].visible.on = 1;
                    }
                    if (items[i].upgrade_cost > amount) {
                        items[i].can_afford = 0;
                    }
                    else {
                        items[i].can_afford = 1;
                    }

                }
            },
            bonus: function (item) {
                // callback game: do something
            }
        };
    }
})();
angular.module('game')
    .factory('Stats', ['$timeout', '$interval', StatsFactory]);

function StatsFactory($timeout, $interval) {
    var stats = {
        income: 0,
        total_amount: 0
    };

    return {
        getStats: function () {
            return stats;
        },
        getTotalAmount: function() {
            return stats.total_amount;
        },
        spendMoney: function(amount) {
            stats.total_amount = stats.total_amount - amount;
        }
    }
};
(function () {
    'use strict';
    
    angular.module('game')
        .directive('gameItem', gameItemDirective);

    function gameItemDirective() {
        return {
            restrict: 'E',
            templateUrl: './app/item/game-item.template.html',
            scope: {
                item: '=',
                total_amount: '='
            },
            replace: true,
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
(function () {
    'use strict';
    
    angular.module('game')
        .directive('gameItems', ['Item', gameItemsDirective]);

    function gameItemsDirective() {
        return {
            restrict: 'E',
            templateUrl: './app/item/game-items.template.html',
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
angular.module('game')
    .directive('gameStats', ['$interval', 'Item', 'Stats', StatsDirective]);

function StatsDirective() {
    return {
        restrict: 'E',
        templateUrl: 'app/stats/game-stats.template.html',
        scope: {
            income: '='
        },
        controller: ['$interval', 'Item', 'Stats', StatsController],
        controllerAs: 'statsCtrl'
    }
}

function StatsController($interval, Item, Stats) {
    var statsCtrl = this;
    var stats = Stats.getStats();
    statsCtrl.stats = stats;

    $interval(function () {
        stats.income = Item.getTotalIncome();
        stats.total_amount = stats.total_amount + stats.income;
        statsCtrl.stats = stats;
        Item.updateVisibility(stats.total_amount);
    }, 1000);
}
