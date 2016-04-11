/**
 * @memberof vdpApp
 * @namespace Controller
 * @description Angular Controllers
 */

(function(){
  /**
  * @memberof vdpApp.Controller
  * @namespace tableCtrl
  * @param $mdSidenav Service provided by Angular Material for controlling the display of Sidenav objects
  * @param $mdDialog  Service provided by Angular Material for controlling the display of dialog popups
  * @param $mdToast   Service provided by Angular Material for controlling the display of notification popups
  * @param mockTableData  Custom Angular service which provides fake app objects
  * @param mockLicenseData  Custom Angular service which provides fake license arrays for each fake app object
  * @description Controller for the Cert Table and Cert Table contextual menu
  */
  angular.module('vdpApp')
    .controller('tableCtrl', ['$mdSidenav', '$mdDialog', '$mdToast', 'mockTableData', 'mockLicenseData', tableCtrl]);

  function tableCtrl($mdSidenav, $mdDialog, $mdToast, mockTableData, mockLicenseData) {
        var vm = this;

        vm.addLicense = addLicense;
        vm.apps = mockTableData;
        vm.ableToApprove = ableToApprove;
        vm.approvalClass = approvalClass;  // for css class assignment on vdpCertTable.html
        vm.approveApp = approveApp;
        vm.email = "";  // email address entered by user on contextual app side menu
        vm.isAppApproved = isAppApproved;
        vm.revokeLicense = revokeLicense;
        vm.saveAppChanges = saveAppChanges;
        vm.selectedIndex = -1;
        vm.selectedObject = {};  //loaded when vm.toggleAppDetails called
        vm.licenseList = [];  //loaded when vm.toggleAppDetails called
        vm.sendCertSummary = sendCertSummary;
        vm.toggleAgreement = toggleAgreement;
        vm.toggleLeftSidenav = toggleLeftSidenav;
        vm.toggleAppDetails = toggleAppDetails;
        vm.unrevokeLicense = unrevokeLicense;

        /*
          Assumed structure of an app object, this is (hopefully) consistent with 
          the current value returned from app service
          {
            index: int
            company: string
            appDisplayName: string
            appCreationDate: string
            appApprovalStatus: int (value of 1 or 2, 2 == approved)
            appApprovalDate: string
            appDescription: string
            developerEmail: string
            lastModifiedByEmail: string
            lastModifiedDate: string
            licenseList: array of strings 
            totalTestsComplete: percent as string
            validationResults: array of objects, object has form {suiteName: string, percentComplete: int}
            prodSecuritySigned: bool
            developerAgreementSigned: bool
         }
       */


        // TODO: move this to a utility service
        //  ---------------- internal to controller ------------------------
        //  showToast activates a pop-up for visual notification
        //  $mdToast is an angular material design service
        function showToast(message) {
          var toastObj = {
            template: "<md-toast>" + message + "</md-toast>",
            hideDelay: 2000,
            position: 'top right',
          };
          
          $mdToast.show(toastObj);
        }
        
        /**
         * @memberof vdpApp.Controller.tableCtrl
         * @function ableToApprove
         * @returns bool
         * @description Helper function for enabling/disabling the approve app button. Returns true if the app is ready to be approved.
         * An app is ready to be approved if both agreements have been signed and all tests have been validated.
         */
        function ableToApprove() {
            var percentComplete = parseFloat(vm.selectedObject.totalTestsComplete);
            var ok = (percentComplete === 100.0) && vm.selectedObject.prodSecuritySigned && vm.selectedObject.developerAgreementSigned;
            return ok;
        }
      
        /**
         * @memberof vdpApp.Controller.tableCtrl
         * @function approveApp
         * @returns void
         * @description Change an app's approval status from 1(not approved) to 2(approved). This is a mock implementation, not
         * a represenation of what actually needs to be done to approve an app.
         */
        function approveApp() {
            vm.selectedObject.appApprovalStatus = 2;
        }

        /**
         * @memberof vdpApp.Controller.tableCtrl
         * @function approvalClass
         * @param {int} index the index of the app object in vm.apps
         * @returns int
         * @description app status icon color can have three states: not ready to approve, ready to approve, approved
         * return an integer corresponding to each potential class based on the vm.apps[index] approval status
         */
        function approvalClass(index){
          var app = vm.apps[index];
          var status = app.appApprovalStatus;
          var percentComplete = parseFloat(app.totalTestsComplete);
          var prod = app.prodSecuritySigned;
          var develop = app.developerAgreementSigned;
          
          if(percentComplete < 100.0){
            return 1;
          }
          
          if(status == "2"){
            return 3;
          }
          
          return 2;
        }
       
        
        /**
         * @memberof vdpApp.Controller.tableCtrl
         * @function isAppApproved
         * @returns bool
         * @description return true if vm.selectedObject.appApprovalStatus === '2', false otherwise
         */
        function isAppApproved() {
          return vm.selectedObject.appApprovalStatus == 2;
        }

        /**
         * @memberof vdpApp.Controller.tableCtrl
         * @function sendCertSummary
         * @returns void
         * @description send email to user entered address
         * user email is value stored in vm.email
         * in time this will be wired to services for productig/sending the mail
         */
        function sendCertSummary() {
              showToast("email sent to: " + vm.email);  //show popup notification to user          
              console.log("let's pretend we sent an email to: " + vm.email);
        }

        /**
         * @memberof vdpApp.Controller.tableCtrl
         * @function toggleLeftSidenav
         * @returns void
         * @description Toggles the navigation menu on the left hand side of the screen. By default the menu is locked in place for display on large screens, but not for smaller screens.
         * Uses the $mdSidenav service provided by Angular Material.
         */
        function toggleLeftSidenav() {
            $mdSidenav('left').toggle();
        }

        /**
         * @memberof vdpApp.Controller.tableCtrl
         * @function toggleAppDetails
         * @param {int} selectedIndex Index location of the selected app in the array of app objects (vm.apps)
         * @returns void
         * @description Toggles the right side contextual app menu containing details about an app selected from the cert table.
         */
        function toggleAppDetails(selectedIndex) {
            vm.selectedIndex = selectedIndex;          
            //so that data in the cert table is not two way bound to data in the side nav, copy the cert table data to selectedObject
            //(angular.copy returns a deep copy, not a reference)
            //this allows the user to change their mind about any changes they make in the sidenav
            //if the user wants to save changes, they need select the save changes button
            vm.selectedObject = angular.copy(vm.apps[selectedIndex]);
            vm.licenseList = mockLicenseData[selectedIndex];  
            vm.email = "";  // reset email in case it has data in it from the last time the sidenav was open
            $mdSidenav('app-details').toggle();
        }
        
        /**
         * @memberof vdpApp.Controller.tableCtrl
         * @function toggleAgreement
         * @param {string} key Key should be the string 'prodSecuritySigned' or 'developerAgreementSigned'
         * @returns void
         * @description Toggles the value of the prodSecuritySigned or developerAgreementSigned property of the app object (vm.apps[selectedIndex][key])
         * The function is tied to the check boxes for developer agreement and prod security agreement.
         */
        function toggleAgreement(key) {
            var checked = vm.selectedObject[key];
            if (checked) {
                vm.selectedObject[key] = false;
                return;
            }
            vm.selectedObject[key] = true;
        }

        /**
         * @memberof vdpApp.Controller.tableCtrl
         * @function appStatusColor
         * @param {int} num The value corresponding to the app's approval status
         * @returns {string} the css class for styling
         * @description takes an app's approval status and returns redStatus if the app has not been approved 
         * and greenStatus if it has been approved
         */
        function appStatusColor(num) {
            if (num === 1) {
                return 'redStatus';
            }
            return 'greenStatus';
        }

        /**
         * @memberof vdpApp.Controller.tableCtrl
         * @function saveAppChanges
         * @returns void
         * @description The app in the right contextual sidenav holds a copy of the app selected in the cert table.
         * Any changes in the sidenav are not automatically reflected on the server
         * side or in the cert table.
         * For now saveAppChanges updates the cert table, in the future, it
         * will update the server side and the cert table.
         */
        function saveAppChanges() {
          //angular.copy returns a deep copy (not a reference)
          vm.apps[vm.selectedIndex] = angular.copy(vm.selectedObject);
          showToast("app changes saved");  //show popup notification to user
        }

        /**
         * @namespace addLicense
         * @memberof vdpApp.Controller.tableCtrl
         */


        /**
         * @memberof vdpApp.Controller.tableCtrl.addLicense
         * @function addLicense
         * @param $event Angular event service
         * @returns void
         * @description Creates a modal dialog for the user to acknowledge and chose to add an app
         * Tied to the add app button in license management section of the contextual side menu
         */
        function addLicense($event) {
          
          /**
           * @memberof vdpApp.Controller.tableCtrl.addLicense
           * @variable  optionsObj 
           * @type {object} 
           * @description Holds the options that determine the display of the modal popup
           */
          var optionsObj = {
                clickOutsideToClose: true,
                controller: licenseCtrl,
                controllerAs: 'ctrl',
                parent: angular.element(document.body),
                targetEvent: $event,
                templateUrl: './partials/addLicenseDialog.html', //this is the relative path from index.html
            };
          
            //display the modal and handle the return if user selected 'ok', if user selects 'cancel', the dialog will close and nothing else will happen.
            $mdDialog.show(optionsObj).then(addLicense);
             
            /**
             * @memberof vdpApp.Controller.tableCtrl.addLicense
             * @function licenseCtrl
             * @param $mdDialog Angular Material service
             * @description Controller for the modal dialog.  Contains methods for opening and closing the dialog.
             */
            function licenseCtrl($mdDialog) {
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

            /**
             * @memberof vdpApp.Controller.tableCtrl.addLicense
             * @function addLicense
             * @returns void
             * @description Adds a license to the mock license array.  Called from within addLicense($event)
             */
            function addLicense() {
                var key = 'n1234kl' + vm.licenseList.length;
                var expiry = '2017-01-01';
                var status = true;
                var licenseObj = {
                  status: status,
                  key: key,
                  expiry: expiry
                };
                
                vm.licenseList.push(licenseObj);
                //update licenseList in mockLicenseData, this is for prototype display purposes only
                mockLicenseData[vm.selectedIndex] = vm.licenseList;
                vm.showToast("license #: " + key + " added");
            }


        }

       /**
        * @namespace unrevokeLicense
        * @memberof vdpApp.Controller.tableCtrl
        */
        
        /**
         * @memberof vdpApp.Controller.tableCtrl.unrevokeLicense
         * @function unrevokeLicense
         * @param $event Angular event service
         * @param license App license to unrevoke
         * @returns void
         * @description Creates a modal dialog for the user to unrevoke an license
         * The user must check the 'acknowledge' box and enter an unrevoke reason in the modal popup before they will 
         * be allowed to unrevoke the license. 
         * Tied to the unrevoke button in license management section of the contextual side menu
         */
        function unrevokeLicense($event, license) {

          /**
           * @memberof vdpApp.Controller.tableCtrl.unrevokeLicense
           * @variable  optionsObj 
           * @type {object} 
           * @description Holds the options that determine the display of the modal popup
           */            
            var optionsObj = {
                clickOutsideToClose: true,
                controller: licenseCtrl,
                controllerAs: 'ctrl',
                parent: angular.element(document.body),
                targetEvent: $event,
                templateUrl: './partials/unrevokeLicenseDialog.html', //this is the relative path from index.html
            };

            /*** This line actually creates the dialog and determines how the returned promise is handled ***/
            $mdDialog.show(optionsObj).then(unrevokeLicense);

            /**
             * @memberof vdpApp.Controller.tableCtrl.unrevokeLicense
             * @function licenseCtrl
             * @param $mdDialog Angular Material service
             * @description Controller for the modal dialog.  Contains methods for opening and closing the dialog.
             * Also contains method for disabling the Unrevoke button.
             */
            function licenseCtrl($mdDialog) {
                var vm = this;

                vm.cancelDialog = cancelDialog;
                vm.checked = false;   // tied to the Acknowledge checkbox on unrevokeLicenseControlDialog.html
                vm.closeDialog = closeDialog;
                vm.disabled = disabled;
                vm.reason = "";  // tied to the reason textbox in unrevokeLicenseControlDialog.html

                function closeDialog() {
                    // close function can only be called if the user entered a reason and checked 'acknowledge'
                    // resolve the mdDialog promise with the reason text entered by user
                    $mdDialog.hide(vm.reason);
                }

                function cancelDialog() {
                    $mdDialog.cancel();
                }

                /*
                  helper function for disabling/enabling the Unrevoke button
                  value of true disables the button
                */
                function disabled(){
                  return !(vm.checked && vm.reason.length > 0);
                }

            }

            /**
             * @memberof vdpApp.Controller.tableCtrl.unrevokeLicense
             * @function unrevokeLicense
             * @param {string} reason The reason the user entered on the modal unrevoke license popup
             * @returns void
             * @description Unrevokes a license. Writes the user entered reason to the console.  Displays success message.
             * For prototype purposes it changes a license status in the mock license array to true. 
             * Called from within unrevokeLicense($event)
             */
            function unrevokeLicense(reason) {
              // the variable, license, is a license object
              // search vm.licenseList and compare by license key
              // for now just do for loop so as not to add any extra libraries
              // also ignoring error handling if item not found since 
              // the function is passed a license already in the license list
              var index = -1;

              for(var i = 0; i < vm.licenseList.length; i++) {
                var temp = vm.licenseList[i];
                if (temp.key === license.key) {
                  index = i;
                }
              }
              
              if (index != -1) {
                vm.licenseList[index].status = true;
              }

              showToast("license status changed to active");  //show popup notification to user          
              console.log("Unrevoke reason: ", reason);
            }

        }

        /**
         * @namespace revokeLicense
         * @memberof vdpApp.Controller.tableCtrl
         */

        /**
         * @memberof vdpApp.Controller.tableCtrl.revokeLicense
         * @function revokeLicense
         * @param $event Angular event service
         * @param license License to revoke
         * @returns void
         * @description Creates a modal dialog for the user to acknowledge and choose to revoke a license
         * The user must check the 'acknowledge' box and enter an revoke reason in the modal popup before they will 
         * be allowed to revoke the license. 
         * Tied to the revoke button in license management section of the contextual side menu
         */
        function revokeLicense($event, license) {

          /**
           * @memberof vdpApp.Controller.tableCtrl.revokeLicense
           * @variable  optionsObj 
           * @type {object} 
           * @description Holds the options that determine the display of the modal popup
           */            
            var optionsObj = {
                clickOutsideToClose: true,
                controller: licenseCtrl,
                controllerAs: 'ctrl',
                parent: angular.element(document.body),
                targetEvent: $event,
                templateUrl: './partials/revokeLicenseDialog.html', //this is the relative path from index.html
            };

            /*** This line actually creates the dialog and determines how the returned promise is handled ***/
            $mdDialog.show(optionsObj).then(revokeLicense);

            /**
             * @memberof vdpApp.Controller.tableCtrl.revokeLicense
             * @function licenseCtrl
             * @param $mdDialog Angular Material $mdDialog service
             * @description Controller for the modal dialog.  Contains methods for opening and closing the dialog.
             */
            function licenseCtrl($mdDialog) {
                var vm = this;

                vm.cancelDialog = cancelDialog;
                vm.closeDialog = closeDialog;
                vm.checked = false;   // tied to the Acknowledge checkbox on revokeLicenseControlDialog.html
                vm.disabled = disabled;
                vm.reason = "";  // tied to the reason textbox in revokeLicenseControlDialog.html
          
                function closeDialog() {
                    // close function can only be called if the user entered a reason and checked 'acknowledge'
                    // resolve the mdDialog promise with the reason text entered by user
                    $mdDialog.hide(vm.reason);
                }

                function cancelDialog() {
                    $mdDialog.cancel();
                }

                /*
                  helper function for disabling/enabling the revoke button
                  value of true disables the button
                */
                function disabled(){
                  return !(vm.checked && vm.reason.length > 0);
                }
            }

            /**
             * @memberof vdpApp.Controller.tableCtrl.revokeLicense
             * @function revokeLicense
             * @param {string} reason The reason the user entered on the modal revoke license popup
             * @returns void
             * @description Revokes a license. Writes the user entered reason to the console.  Displays success message.
             * For prototype purposes it changes a license status in the mock license array to false.  
             * Called from within revokeLicense($event)
             */
            function revokeLicense(reason) {
              // the value, license, is a license object
              // search the vm.license list and compare by license key
              // for now just do for loop so as not to add any extra libraries
              // also ignoring error handling if item not found since 
              // the function is passed a license already in the license list
              var index = -1;

              for(var i = 0; i < vm.licenseList.length; i++) {
                var temp = vm.licenseList[i];
                if (temp.key === license.key) {
                  index = i;
                }
              }
                
              if (index != -1) {
                vm.licenseList[index].status = false;
              }
              
              showToast("license status changed to inactive");  //show popup notification to user          
              console.log("Revoke reason: ", reason);
            }
        }

        /**
         * @memberof vdpApp.Controller.tableCtrl
         * @function searchCert
         * @param $timeout Angular timeout service
         * @param $q Angular service for promises
         # @param $log Angular logging service
         * @returns void
         * @description Search the list of apps
         */
        function searchCert($timeout, $q, $log) {
            var self = this;
            self.simulateQuery = false;
            self.isDisabled = false;
            // list of `state` value/display objects
            self.states = loadAll();
            self.querySearch = querySearch;
            self.selectedItemChange = selectedItemChange;
            self.searchTextChange = searchTextChange;
            // ******************************
            // Internal methods
            // ******************************
            /**
             * Search for states... use $timeout to simulate
             * remote dataservice call.
             */
            function querySearch(query) {
                var results = query ? self.states.filter(createFilterFor(query)) : self.states,
                    deferred;
                if (self.simulateQuery) {
                    deferred = $q.defer();
                    $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
                    return deferred.promise;
                } else {
                    return results;
                }
            }
            function searchTextChange(text) {
                $log.info('Text changed to ' + text);
            }
            function selectedItemChange(item) {
                $log.info('Item changed to ' + JSON.stringify(item));
            }
            /**
             * Build `states` list of key/value pairs
             */
            function loadAll() {
                var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
                return allStates.split(/, +/g).map(function (state) {
                    return {
                        value: state.toLowerCase(),
                        display: state
                    };
                });
            }
            /**
             * Create filter function for a query string
             */
            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(state) {
                    return (state.value.indexOf(lowercaseQuery) === 0);
                };
            }
        }
    }


})();
