/**
 * @namespace vdpApp
 * @description Top level module for the dashboard\n
 * dependencies on: ngMaterial\n
 * initializes website theming through $mdThemingProvider
 */

(function () {
    angular.module('vdpApp', ['ngMaterial'])    
     //Color Theme config
      .config(function ($mdThemingProvider) {
          $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('grey')
            .warnPalette('red');
      });

})();

