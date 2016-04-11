(function () {
/**
 * @memberof vdpApp.Directive
 * @namespace vdpCertTableTotal
 * @description Angular template directive that wraps the cert table and the cert app details directives.
 * HTML partial is defined at partials/vdpCertTableTotal.html
 * Use the directive in HTML with the tag <vdp-cert-table-total>
 */

    angular.module('vdpApp')
      .directive('vdpCertTableTotal', vdpCertTableTotal);

    function vdpCertTableTotal() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './partials/vdpCertTableTotal.html',
        };
    }

})();
