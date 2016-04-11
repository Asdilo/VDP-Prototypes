/**
 * @memberof vdpApp
 * @namespace Service
 * @description Angular Services
 */

(function(){
/**
 * @memberof vdpApp.Service
 * @namespace mockLicenseData
 * @description Mock Data service for testing
 */

 /**
  * @class mockLicenseObject
  * @memberof vdpApp.Service.mockLicenseData
  * @classdesc class has data members equal to parameters list
  * @param {bool} status - true means key active
  * @param {string} [key='abc123Ef8pQ1036'] - alphanumeric key
  * @param {string} [expiry='2016-01-01'] -  date in format 'YYYY-MM-DD'
  */
  var mockLicenseObject = function(status, key, expiry){
    this.status = status;
    this.key = key || 'abc123Ef8pQ1036';
    this.expiry = expiry || '2016-01-01';
  };

  // fake license objects
  var lic1 = new mockLicenseObject(true);
  var lic2 = new mockLicenseObject(false, 'AbC123DHi087Zql', '2017-05-31');

  /**
   * @variable mockLicenseData
   * @memberof vdpApp.Service.mockLicenseData
   * @description Array of arrays of license objects.  For testing only.
   */
  var mockLicenseData = [
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
    [lic1, lic2],
  ];

  angular.module('vdpApp')
    .value('mockLicenseData', mockLicenseData);

})();
