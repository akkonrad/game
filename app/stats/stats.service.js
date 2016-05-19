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