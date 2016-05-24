angular.module('game')
    .directive('gameStats', ['$interval', 'Item', 'Stats', StatsDirective]);

function StatsDirective() {
    return {
        restrict: 'E',
        templateUrl: 'app/stats/game-stats.template.html',
        scope: {
            income: '='
        },
        controller: ['$interval', 'Item', 'Stats', 'Action', StatsController],
        controllerAs: 'statsCtrl'
    }
}

function StatsController($interval, Item, Stats, Action) {
    var statsCtrl = this;
    var stats = Stats.getStats();
    statsCtrl.stats = stats;

    $interval(function () {
        stats.income = Item.getTotalIncome();
        stats.total_amount = stats.total_amount + stats.income;
        statsCtrl.stats = stats;
        Item.updateVisibility(stats.total_amount);
        Action.updateVisibility(stats.total_amount, stats.respect);
    }, 1000);
}
