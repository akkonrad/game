(function () {
    'use strict';

    angular.module('game')
        .factory('Action', ['$timeout', '$interval', 'Stats', ActionFactory]);

    function ActionFactory($timeout, $interval, Stats) {
        var actions = getActionsMockArray();
        var stats = Stats.getStats();

        return {
            all: function () {
                return actions;
            },
            updateVisibility: function (amount, respect) {
                for (var i = 0; i < actions.length; i++) {
                    // Whenever total amount reaches action visibility level, keep it visible for user.
                    if (actions[i].visible.on == 0 && actions[i].visible.visible_at <= amount) {
                        actions[i].visible.on = 1;
                    }
                    if (actions[i].requirements.respect <= respect) {
                        actions[i].can_afford_respect = 1;
                    }
                    else {
                        actions[i].can_afford_respect = 0;
                    }

                    if (actions[i].requirements.money <= amount) {
                        actions[i].can_afford_money = 1;
                    }
                    else {
                        actions[i].can_afford_money = 0;
                    }

                }
            },
            valiadatePerform: function (action) {
                if (action.requirements.money <= stats.total_amount && action.requirements.respect <= stats.respect &&
                    action.cost.money <= stats.total_amount &&
                    action.active === 1) {
                    return true;
                }
                else {
                    return false;
                }
            },
            performAction: function (action) {
                Stats.spendMoney(action.cost.money);
                action.active = 0;
                action.current_progress = 0;

                $timeout(function () {
                    action.active = 1;
                    action.current_progress = 0;
                    Stats.getActionReward(action);
                }, action.duration * 1000);

                action.timeleft = action.duration - 1;
                var time_left = action.duration - 1;

                $interval(function () {
                    action.current_progress += (100 / time_left);
                    action.timeleft--;
                }, 1000, action.duration - 1);
            }
        };
    }
})();