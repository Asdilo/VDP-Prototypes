(function () {
/**
 * @memberof vdpApp.Directive
 * @namespace vdpHeader
 * @description Angular directive template for the page header
 * HTML partial is defined at partials/vdpHeader.html
 */

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
