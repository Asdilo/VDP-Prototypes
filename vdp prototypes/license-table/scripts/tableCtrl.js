(function () {

    angular.module('vdpApp')
      .controller('tableCtrl', ['$mdSidenav', '$mdDialog', '$mdToast', 'tableFactory', tableCtrl]);

    //THIS IS THE EVERYTHING FUNCTION FOR VISUAL PROTOTYPING!! IT SHOULD NOT BE USED AS IS IN PRODUCTION!!
    function tableCtrl($mdSidenav, $mdDialog, $mdToast, tableFactory) {
        var vm = this;
        
        vm.merchantFlex = 30;
        vm.appFlex = 30;
        vm.licenseFlex = 20;
        vm.expiryFlex = 20;
        
        vm.onboardApp = onboardApp;
        vm.toggleLeftSidenav = toggleLeftSidenav;
        vm.fakeTableData = [
            new tableFactory("App Merchant With A Really Really Really Really Big Name", "Big App Corp", "abcdefh123456asklfdjkasjf18347!@#$#@$@#", "4/28/16"), 
            new tableFactory("Appasaurus Rex", "Apparaptor", "qwirj1@#$%%", "5/1/17"),
            new tableFactory("Muhammed Appi", "Float Like A Butterfly", "aklfjoig!#$g", "8/1/16"),
            new tableFactory("Merchant Merchant Merchant", "Big App-le", "!@#$asdfj#@$", "12/1/16"),
            new tableFactory("App Merchant With A Really Really Really Really Big Name", "Big App Corp", "abcdefh123456asklfdjkasjf18347!@#$#@$@#", "4/28/16"), 
            new tableFactory("Appasaurus Rex", "Apparaptor", "qwirj1@#$%%", "5/1/17"),
            new tableFactory("Muhammed Appi", "Float Like A Butterfly", "aklfjoig!#$g", "8/1/16"),
            new tableFactory("Merchant Merchant Merchant", "Big App-le", "!@#$asdfj#@$", "12/1/16"),        
            new tableFactory("App Merchant With A Really Really Really Really Big Name", "Big App Corp", "abcdefh123456asklfdjkasjf18347!@#$#@$@#", "4/28/16"), 
            new tableFactory("Appasaurus Rex", "Apparaptor", "qwirj1@#$%%", "5/1/17"),
            new tableFactory("Muhammed Appi", "Float Like A Butterfly", "aklfjoig!#$g", "8/1/16"),
            new tableFactory("Merchant Merchant Merchant", "Big App-le", "!@#$asdfj#@$", "12/1/16"),
            new tableFactory("App Merchant With A Really Really Really Really Big Name", "Big App Corp", "abcdefh123456asklfdjkasjf18347!@#$#@$@#", "4/28/16"), 
            new tableFactory("Appasaurus Rex", "Apparaptor", "qwirj1@#$%%", "5/1/17"),
            new tableFactory("Muhammed Appi", "Float Like A Butterfly", "aklfjoig!#$g", "8/1/16"),
            new tableFactory("Merchant Merchant Merchant", "Big App-le", "!@#$asdfj#@$", "12/1/16"),                    
            new tableFactory("App Merchant With A Really Really Really Really Big Name", "Big App Corp", "abcdefh123456asklfdjkasjf18347!@#$#@$@#", "4/28/16"), 
            new tableFactory("Appasaurus Rex", "Apparaptor", "qwirj1@#$%%", "5/1/17"),
            new tableFactory("Muhammed Appi", "Float Like A Butterfly", "aklfjoig!#$g", "8/1/16"),
            new tableFactory("Merchant Merchant Merchant", "Big App-le", "!@#$asdfj#@$", "12/1/16"),
            new tableFactory("App Merchant With A Really Really Really Really Big Name", "Big App Corp", "abcdefh123456asklfdjkasjf18347!@#$#@$@#", "4/28/16"), 
            new tableFactory("Appasaurus Rex", "Apparaptor", "qwirj1@#$%%", "5/1/17"),
            new tableFactory("Muhammed Appi", "Float Like A Butterfly", "aklfjoig!#$g", "8/1/16"),
            new tableFactory("Merchant Merchant Merchant", "Big App-le", "!@#$asdfj#@$", "12/1/16"),        
            new tableFactory("App Merchant With A Really Really Really Really Big Name", "Big App Corp", "abcdefh123456asklfdjkasjf18347!@#$#@$@#", "4/28/16"), 
            new tableFactory("Appasaurus Rex", "Apparaptor", "qwirj1@#$%%", "5/1/17"),
            new tableFactory("Muhammed Appi", "Float Like A Butterfly", "aklfjoig!#$g", "8/1/16"),
            new tableFactory("Merchant Merchant Merchant", "Big App-le", "!@#$asdfj#@$", "12/1/16"),
            new tableFactory("App Merchant With A Really Really Really Really Big Name", "Big App Corp", "abcdefh123456asklfdjkasjf18347!@#$#@$@#", "4/28/16"), 
            new tableFactory("Appasaurus Rex", "Apparaptor", "qwirj1@#$%%", "5/1/17"),
            new tableFactory("Muhammed Appi", "Float Like A Butterfly", "aklfjoig!#$g", "8/1/16"),
            new tableFactory("Merchant Merchant Merchant", "Big App-le", "!@#$asdfj#@$", "12/1/16"),                            
        ];
        
        function showToast(message) {
            var toastObj = {
                template: "<md-toast>" + message + "</md-toast>",
                hideDelay: 6000,
                position: 'top right',
            };

            $mdToast.show(toastObj);
        }
        
        function onboardApp($event) {
            //optionsObj defines the appearance of the modal popup
            var optionsObj = {
                clickOutsideToClose: true,
                controller: DialogController,
                controllerAs: 'ctrl',
                parent: angular.element(document.body),
                targetEvent: $event,
                templateUrl: './partials/onboardDialog.html', //this is the relative path from index.html
            };

            $mdDialog.show(optionsObj).then();

            function DialogController($mdDialog) {

                var vm = this;
                vm.closeDialog = closeDialog;
                vm.cancelDialog = cancelDialog;
                vm.appDialog = appDialog;
                
                vm.entSum1 = 'Entitlement Summary (string). A brief explaination of what the entitlement will allow. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis placerat lacus. Pellentesque sed mi interdum, ultrices magna vitae, varius nulla.';
                vm.entSum2 = 'EntitlementSummary (string). A brief explaination of what the entitlement will allow. Pellentesque sed mi interdum, ultrices magna vitae, varius nulla. Pellentesque sed mi interdum, ultrices magna vitae, varius nulla. Duis sodales vel dui eu sagittis.';
                vm.cbLitle = false;
                
                function closeDialog() {
                    $mdDialog.hide();
                    showToast("Onboarding Cancelled");
                    console.log(license);
                }

                function cancelDialog() {
                    $mdDialog.cancel();
                    showToast("Onboarding Cancelled");
                }

                function appDialog() {
                    $mdDialog.hide();
                    showToast("Application Added");
                }
            }
        }

        function toggleLeftSidenav() {
            $mdSidenav('left').toggle();
        }
    }


})();
