(function () {

    angular.module('vdpApp')
      .directive('vdpHeader', vdpHeader);

    function vdpHeader() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './partials/vdpHeader.html',
        };
    }

})();
