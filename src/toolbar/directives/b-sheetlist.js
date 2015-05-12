/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bSheetlist', ['$timeout', function ($timeout) {

    return {
        restrict: 'A',
        replace: true,
        scope: {
        },
        templateUrl: 'template/widget/sheetlist.html',
        link: {
            post: function ($scope, $ele, $attr, $controller) {
                var BOX_WIDTH = 800 - 1;
                var startIndex = 0;

                var status = {
                    selected: 0,
                    overflow: false,
                    translate: 0,
                    leftMore: false,
                    rightMore: false
                };

                $timeout(refresh, 0);

                var $list = $(".b-sl-list", $ele);
                var listRect = $list[0].getBoundingClientRect();
                var RIGHT_WIDTH = Math.round(listRect.left) + BOX_WIDTH;

                /* ---- scope 挂载 start ---- */
                $scope.status = status;
                $scope.sheets = [
                    'Sheet1', 'Sheet2', 'Sheet3', 'Sheet4', 'Sheet5',
                    'Sheet6', 'Sheet7', 'Sheet8', 'Sheet9', 'Sheet10',
                    'Sheet11', 'Sheet12', 'Sheet13', 'Sheet14', 'Sheet15'
                ];

                $scope.itemChange = function (index) {
                    status.selected = index;

                    // 检查当前点击的元素是否需要右移
                    var items = $("li", $list);

                    if (Math.round(items[index].getBoundingClientRect().right) > RIGHT_WIDTH) {
                        $scope.moveLeft();
                    }
                };

                /**
                 * 按钮左移
                 */
                $scope.moveRight = function () {
                    var items = $("li", $list);

                    // 左侧没有更多item可供移动
                    if (!status.leftMore) {
                        return;
                    }

                    status.translate += Math.round(items[startIndex].getBoundingClientRect().width) - 1;
                    startIndex--;

                    status.leftMore = startIndex > 0;
                    status.rightMore = true;
                    status.selected = startIndex;
                };

                /**
                 * 按钮右移
                 */
                $scope.moveLeft = function () {
                    var items = $("li", $list);

                    // 右侧没有更多item可供移动
                    if (!status.rightMore) {
                        return;
                    }

                    var index = findLast(items);
                    var diff = Math.round(items[index].getBoundingClientRect().right - RIGHT_WIDTH);
                    var width;
                    var count = 0;

                    while (diff > 0) {
                        count++;

                        width = Math.round(items[startIndex].getBoundingClientRect().width);
                        diff -= width;

                        status.translate -= width - 1;
                    }

                    startIndex += count;
                    status.leftMore = true;
                    status.rightMore = index < items.length - 1;

                    status.selected = index;
                };
                /* ---- scope 挂载 end ---- */

                function findLast(items) {
                    var item;
                    var rect;

                    for (var i = 0, len = items.length; i < len; i++) {
                        item = items[i];
                        rect = item.getBoundingClientRect();

                        if (rect.right > RIGHT_WIDTH) {
                            break;
                        }
                    }

                    return i;
                }

                function refresh() {
                    var lastItem = $('li:last-child', $ele)[0];
                    var rect = lastItem.getBoundingClientRect();

                    if (RIGHT_WIDTH < rect.right) {
                        addOverflow();
                    } else {
                        clearOverflow();
                    }
                }

                function addOverflow() {
                    status.overflow = true;
                    status.leftMore = false;
                    status.rightMore = true;

                    startIndex = 0;
                    status.translate = 0;
                }

                function clearOverflow() {
                    status.overflow = false;
                    status.rightMore = false;
                    status.leftMore = false;

                    startIndex = 0;
                    status.translate = 0;
                }
            }
        }
    };
}]);