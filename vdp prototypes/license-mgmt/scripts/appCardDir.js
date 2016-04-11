(function () {

    angular.module('vdpApp')
      .directive('appCard', appCard);

    function appCard() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './partials/appCard.html',
        };
    }

})();
