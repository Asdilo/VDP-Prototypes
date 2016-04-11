(function(){
  angular.module('vdpApp')

    //Created a custom sorting filter below. Needs to be applied to a click action
    .filter('orderObjectBy', function () {
        return function (input, attribute) {
            if (!angular.isObject(input)) return input;

            var array = [];
            for (var objectKey in input) {
                array.push(input[objectKey]);
            }

            array.sort(function (a, b) {
                a = parseInt(a[attribute]);
                b = parseInt(b[attribute]);
                return a - b;
            });
            return array;
        };
    });
})();
