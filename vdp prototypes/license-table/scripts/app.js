
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

