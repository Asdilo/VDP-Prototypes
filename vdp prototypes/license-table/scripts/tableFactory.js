(function () {
    angular.module('vdpApp')
      .factory('tableFactory', tableFactory);

    function tableFactory() {
      function AppData(merch, app, lic, expiry){
       this.merchant = merch;
       this.app = app;
       this.license = lic;
       this.expiry = expiry;       
      }
      
      return AppData;
    }

})();