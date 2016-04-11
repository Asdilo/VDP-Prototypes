(function () {
    angular.module('vdpApp')
      .directive('vdpMenu', vdpMenu);

    function vdpMenu() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './partials/vdpMenu.html',
        };
    }

})();
