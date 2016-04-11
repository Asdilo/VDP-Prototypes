(function () {

    angular.module('vdpApp')
      .controller('homeCtrl', ['$mdSidenav', '$mdDialog', '$mdToast', homeCtrl]);

    //THIS IS THE EVERYTHING FUNCTION FOR VISUAL PROTOTYPING!! IT SHOULD NOT BE USED AS IS IN PRODUCTION!!
    function homeCtrl($mdSidenav, $mdDialog, $mdToast) {
        var vm = this;



        function showToast(message) {
            var toastObj = {
                template: "<md-toast>" + message + "</md-toast>",
                hideDelay: 6000,
                position: 'top right',
            };

            $mdToast.show(toastObj);
        }



    }


})();
