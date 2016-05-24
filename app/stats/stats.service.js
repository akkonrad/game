angular.module('game')
    .factory('Stats', ['$timeout', '$interval', StatsFactory]);

function StatsFactory($timeout, $interval) {
    var stats = {
        income: 0,
        total_amount: 0,
        respect: 0
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
        },
        getActionReward: function(action) {
            stats.total_amount = stats.total_amount + action.reward.money;
            stats.respect = stats.respect + action.reward.respect;
        }
    }
};