app.directive('gameStats', ['$interval', 'Item', 'Stats', function ($interval, Item, Stats) {
    return {
        restrict: 'E',
        templateUrl: 'app/stats/stats.html',
        scope: {
            income: '='
        },
        controllerAs: 'statsCtrl',
        controller: function () {
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
    }
}]);

angular.module('game')
    .factory('Stats', ['$timeout', '$interval', function StatsFactory($timeout, $interval) {
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
    }]);
