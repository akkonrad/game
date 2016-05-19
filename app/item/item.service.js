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
