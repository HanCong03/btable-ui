/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bCellstyles', ['$window', function ($window) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onselect: '&'
        },
        templateUrl: 'template/toolbar/widget/cellstyles.html',
        link: function ($scope, $ele) {
            var hook = $scope.onselect || angular.noop();
            var originalBuiltinStyles = BTable.BUILTIN_CELLSTYLE;
            var current;
            var offset = 0;

            // 和css中对应
            var itemHeight = 33;

            var cellstyleOrder = [
                [0, 27, 26, 28],
                [22, 23, 53, 11, 24, 21, 20, 10],
                [15, 16, 17, 18, 19, 25],
                [
                    30, 34, 38, 42, 46, 50,
                    31, 35, 39, 43, 47, 51,
                    32, 36, 40, 44, 48, 52,
                    29, 33, 37, 41, 45, 49
                ],
                [5, 4, 7, 3, 6]
            ];

            var builtinStyles = [];
            var uncategoryBuiltinStyles = [];

            for (var i = 0, len = cellstyleOrder.length; i < len; i++) {

                if (!builtinStyles[i]) {
                    builtinStyles[i] = [];
                }

                for (var j = 0, jlen = cellstyleOrder[i].length; j < jlen; j++) {
                    current = originalBuiltinStyles[cellstyleOrder[i][j]];
                    current.styleText = toStyleText(current.style);

                    builtinStyles[i].push(current);
                    uncategoryBuiltinStyles.push(current);
                }
            }


            // 未分类内建样式
            $scope.uncategoryBuiltinStyles = uncategoryBuiltinStyles;
            $scope.builtinStyles = builtinStyles;

            var maxOffset = Math.ceil(uncategoryBuiltinStyles.length / 3) - 2;

            $scope.allowUp = offset > 0;
            $scope.allowDown = offset < maxOffset;

            var $contentBox = $(".b-drappanel-content", $ele);
            var $menu = $(".b-drappanel-menu", $ele);

            $scope.pageUp = function () {
                if (offset <= 0) {
                    offset = 0;
                    return;
                }

                offset--;
                scroll();
            }

            $scope.pageDown = function () {
                if (offset >= maxOffset) {
                    offset = maxOffset;
                    return;
                }

                offset++;
                scroll();
            }

            $scope.openPanel = function (evt) {
                setTimeout(function () {
                    $menu.show();
                }, 0);
            };

            $scope.closePanel = function (evt) {
                $menu.hide();
            };

            $scope.select = function (id, isBuiltin) {
                hook({
                    id: id,
                    isBuiltin: isBuiltin
                });
            };

            $scope.checkPop = function (evt) {
                if (evt.target.getAttribute('isitem') === null) {
                    evt.stopPropagation();
                }
            };

            $(document).on("click", $scope.closePanel);

            function scroll() {
                $scope.allowUp = offset > 0;
                $scope.allowDown = offset < maxOffset;

                $contentBox.css({
                    transform: 'translateY(-' + offset * (itemHeight) + 'px)'
                });
            }
        }
    };

    function toStyleText(styles) {
        var result = [];

        if (styles.borders) {
            parseBorder(styles.borders.border);
        }

        if (styles.fills) {
            result.push('background-color: ' + styles.fills.fill);
        }

        if (styles.fonts) {
            parseFont(styles.fonts);
        }

        if (styles.alignments && styles.alignments.horizontal) {
            result.push('text-align: ' + styles.alignments.horizontal);
        }

        return result.join(';');

        function parseFont(data) {
            var val;
            var styleMap = {
                'bold': 'font-weight: bold',
                'italic': 'font-style: italic',
                'underline': 'text-decoration: underline',
                'throughline': 'text-decoration: line-through'
            };

            for (var key in data) {
                if (!data.hasOwnProperty(key)) {
                    continue;
                }

                val = data[key];

                switch (key) {
                    case 'color':
                        result.push('color: ' + val);
                        break;

                    case 'name':
                        result.push('font-family: ' + val);
                        break;

                    case 'size':
                        result.push('font-size: ' + val + 'px');
                        break;

                    default:
                        if (val === false) {
                            break;
                        }
                        result.push(styleMap[key]);
                        break;
                }
            }


        }

        function parseBorder(data) {
            if (data.left === 'none') {
                result.push('border-left: none');
            } else {
                result.push('border-left: ' + borderText(data.left));
            }

            if (data.right === 'none') {
                result.push('border-right: none');
            } else {
                result.push('border-right: ' + borderText(data.right));
            }

            if (data.top === 'none') {
                result.push('border-top: none');
            } else {
                result.push('border-top: ' + borderText(data.top));
            }

            if (data.bottom === 'none') {
                result.push('border-bottom: none');
            } else {
                result.push('border-bottom: ' + borderText(data.bottom));
            }
        }
    }

    function borderText(borderOption) {
        var color = borderOption.color;

        switch (borderOption.style) {
            case 'thin':
                return '1px solid ' + color;

            case 'medium':
                return '2px solid ' + color;
        }
    }
}]);