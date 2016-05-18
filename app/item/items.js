app.directive('gameItems', function (Item) {
    return {
        restrict: 'E',
        templateUrl: './app/item/items.html',
        scope: {
            item: '='
        },
        controller: function() {
            this.items = Item.all().reverse();

            this.greaterThan = function(prop, val){
                return prop >= val;
            }
        },
        controllerAs: 'itemsCtrl'
    }
});

app.directive('gameItem', function (Item, Stats) {
    return {
        restrict: 'E',
        templateUrl: './app/item/item.html',
        scope: {
            item: '=',
            total_amount: '='
        },
        replace: true,
        controller: function($scope) {
            console.log($scope);
            this.upgrade = function(item) {
                if (item.upgrade_cost <= Stats.getTotalAmount() && item.active == 1) {
                    Item.upgrade(item);
                    Stats.spendMoney(item.upgrade_cost);
                }
            }
        },
        controllerAs: 'itemCtrl'
    }
});

angular.module('game')
    .factory('Item', ['$timeout', '$interval', function ItemFactory($timeout, $interval) {
        var items = [
            {
                name: "Name 1", // item name, displayed on
                level: 1,
                color: ['red', 'yellow', 'aqua', 'blue', 'light-blue', 'green', 'navy', 'teal', 'olive', 'lime', 'orange', 'fuchsia', 'purple', 'maroon', 'black'],
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
                description: "lorem ipsum dolor sit amet",
                upgrade_cost: 80,
                can_afford: 0,
                active: 1,
                timeout: 12,
                current_income: 15,
                base_income: 15,
                requires: [
                    "Item 1",
                    "Item 2",
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

                var time_left = item.timeout - 1;

                $interval(function () {
                    item.current_progress += (100/time_left);
                }, 1000, item.timeout-1);

                // callback game: do something
            },
            getTotalIncome: function() {
                var income = 0;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].level > 0) {
                        income = income + items[i].current_income;
                    }
                }

                return income;
            },
            updateVisibility: function(amount) {
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
    }]);
