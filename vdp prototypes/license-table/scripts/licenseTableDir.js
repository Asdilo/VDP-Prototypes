(function () {
    angular.module('vdpApp')
      .directive('licenseTable', licenseTable);

    function licenseTable() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './partials/licenseTable.html',
        };
    }
})();
      
