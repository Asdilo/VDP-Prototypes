/**
 * @memberof vdpApp
 * @namespace Directive
 * @description Angular Directives
 */

(function () {
/**
 * @memberof vdpApp.Directive
 * @namespace vdpCertAppDetails
 * @description Angular template directive for displaying app details in the right contextual menu.
 * HTML partial is defined in partials/vdpCertAppDetails.html
 * Depends on the app selected in the cert table being copied to vm.selectedObject.
 * Use the directive in html with the tag <vdp-cert-app-details>
 */

    angular.module('vdpApp')
      .directive('vdpCertAppDetails', vdpCertAppDetails);

    function vdpCertAppDetails() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './partials/vdpCertAppDetails.html',
        };
    }

})();
