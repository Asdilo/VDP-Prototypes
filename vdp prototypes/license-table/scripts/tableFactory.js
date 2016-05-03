(function () {
    angular.module('vdpApp')
      .factory('tableFactory', tableFactory);

    function tableFactory() {
      function AppData(merch, app, promote, lic, expiry){
       this.merchant = merch;
       this.app = app;
       this.promote = promote || false;
       this.license = lic || "";
       this.expiry = expiry || "";       
      }
      
      return AppData;
    }

})();