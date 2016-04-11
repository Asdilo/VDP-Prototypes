(function(){
/**
 * @memberof vdpApp.Controller
 * @namespace vdpLoginCtrl
 * @param $mdDialog Angular Material service
 * @description Controller for the login screen
 */

  angular.module('vdpApp')
    .controller('vdpLoginCtrl', ['$mdDialog', vdpLoginCtrl]);

  function vdpLoginCtrl($mdDialog) {

      var vm = this;

      vm.loginDialog = loginDialog;

      function loginDialog($event) {
          //optionsObj defines the appearance of the modal popup
          var optionsObj = {
              clickOutsideToClose: true,
              controller: DialogController,
              controllerAs: 'ctrl',
              parent: angular.element(document.body),
              targetEvent: $event,
              templateUrl: './partials/loginDialog.html', //this is the relative path from index.html
          };

          $mdDialog.show(optionsObj).then();

          function DialogController($mdDialog) {

              var vm = this;
              vm.closeDialog = closeDialog;
              vm.cancelDialog = cancelDialog;

              function closeDialog() {
                  $mdDialog.hide();
              }

              function cancelDialog() {
                  $mdDialog.cancel();
              }
          }
      }

    }




})();
