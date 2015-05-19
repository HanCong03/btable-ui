/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bNumberformat', ['$translate', function ($translate) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onselect: '&'
        },
        templateUrl: 'template/toolbar/widget/numberformat.html',
        link: function ($scope, $ele, $attr, $controller) {
            var hook = $scope.onselect || angular.noop;

            var types = [
                "general",
                "number",
                "currency",
                "accountant",
                "shortdate",
                "longdate",
                "time",
                "percentage",
                "fraction",
                "scientific",
                "text"
            ];

            var codes = [
                'General',
                '0.00_);[Red](0.00)',
                '"¥"#,##0.00_);[Red]("¥"#,##0.00)',
                '_ "¥"* #,##0.00_ ;_ "¥"* -#,##0.00_ ;_ "¥"* "-"??_ ;_ @_ ',
                'yyyy/m/d',
                '[$-F800]dddd, mmmm dd, yyyy',
                '[$-F400]h:mm:ss AM/PM',
                '0.00%',
                '# ?/?',
                '0.00E+00',
                '@'
            ];

            $scope.types = types;

            $scope.select = function (index) {
                hook({
                    code: codes[index]
                });
            };
        }
    };
}]);