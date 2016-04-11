(function () {
/**
 * @memberof vdpApp.Directive
 * @namespace vdpCertTable
 * @description Angular template directive for displaying the cert table.
 * HTML partial is defined at partials/vdpCertTable.html
 * Use the directive in html with the tag <vdp-cert-table>
 */

    angular.module('vdpApp')
      .directive('vdpCertTable', vdpCertTable);

    function vdpCertTable() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './partials/vdpCertTable.html',
        };
    }

})();
